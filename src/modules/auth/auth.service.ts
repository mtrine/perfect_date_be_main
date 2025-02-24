import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as ms from 'ms';
import { UserRepository } from '../user/user.repo';
import { CreateUserDto } from '../user/dto/request/create-user.dto';
import { UserInterface } from '../user/dto/response/user.interface';
import { JwtService } from '@nestjs/jwt';
import { KeyTokenService } from '../key-token/key-token.service';
import { ConfigService } from '@nestjs/config';
import { CustomException } from 'src/exception-handle/custom-exception';
import { ErrorCode } from 'src/enums/error-code.enum';
import { access_token_private_key, access_token_public_key, refresh_token_private_key, refresh_token_public_key } from 'src/constants/jwt.constants';
import { Response } from 'express';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
    private client = new OAuth2Client(`${this.configService.get<string>('GG_CLIENT_ID')}`);
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly keyTokenService: KeyTokenService,
        private readonly configService: ConfigService,
    ) { }
    async validateGoogleUser(googleUser: CreateUserDto) {
        const user = await this.userRepository.findByEmail(googleUser.email);
        if (user) return user
        return await this.userRepository.createUser(googleUser);
    }

    async validateUser(email: string, pass: string) {
        const user = await this.userRepository.findByEmail(email);
        if (user && user.user_password === pass) {
            const { user_password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: UserInterface, res: Response) {
        const payload = {
            sub: "token login",
            iss: "from server",
            _id: user._id,
            role: user.user_role,
        }
        const accessToken = this.generateAccessToken(payload, access_token_private_key);
        const refreshToken = this.generateRefreshToken(payload, refresh_token_private_key);
        const publicKey = await this.keyTokenService.createKeyToken(user._id.toString(), access_token_public_key, access_token_private_key, refresh_token_public_key, refresh_token_private_key, refreshToken);
        if (!publicKey) {
            throw new CustomException(ErrorCode.PUBLICKEY_ERROR);
        }
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: this.configService.get<string>('NODE_ENV') === 'production' ? true : false,
            maxAge: +ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME')),
            sameSite: 'none'
        })
        return {
            user_id: user._id,
            access_token: accessToken,
        };
    }

    async handleRefreshToken(refreshToken: string, res: Response) {
        // Kiểm tra nếu refresh token đã được sử dụng
        const foundToken = await this.keyTokenService.findByRefreshTokenUsed(refreshToken);
        if (foundToken) {
            const { _id } = await this.jwtService.verifyAsync(refreshToken, {
                secret: foundToken.refresh_privateKey,
            });
            await this.keyTokenService.deleteKeyById(foundToken._id.toString());
            throw new CustomException(ErrorCode.REFRESH_TOKEN_ERROR);
        }

        // Tìm refresh token trong database
        const holderToken = await this.keyTokenService.findByRefreshToken(refreshToken);
        if (!holderToken) {
            throw new CustomException(ErrorCode.USER_NOT_REGISTER);
        }

        let decodedToken: any;
        try {
            // Xác minh token và bắt lỗi hết hạn
            decodedToken = await this.jwtService.verifyAsync(refreshToken, {
                secret: holderToken.refresh_privateKey,
            });
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new CustomException(ErrorCode.REFRESH_TOKEN_EXPIRED);
            }
            throw new CustomException(ErrorCode.REFRESH_TOKEN_INVALID);
        }

        // Kiểm tra user từ decodedToken
        const foundUser = await this.userRepository.findById(decodedToken._id);
        if (!foundUser) {
            throw new CustomException(ErrorCode.USER_NOT_REGISTER);
        }

        // Tạo access token và refresh token mới
        const payload = {
            sub: 'token login',
            iss: 'from server',
            _id: foundUser._id,
            role: foundUser.user_role,
        };
        const accessToken = this.generateAccessToken(payload, holderToken.access_privateKey);
        const newRefreshToken = this.generateRefreshToken(payload, holderToken.refresh_privateKey);

        // Cập nhật refresh token trong cơ sở dữ liệu
        await this.keyTokenService.updateKeyToken(holderToken._id.toString(), refreshToken, newRefreshToken);

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: this.configService.get<string>('NODE_ENV') === 'production' ? true : false,
            // secure: true,
            maxAge: +ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME')),
            sameSite: 'none'
        })
        return {
            user_id: foundUser._id,
            access_token: accessToken,
        };
    }

    //Handle JWT
    generateAccessToken(payload: any, access_token_private_key: string) {
        return this.jwtService.sign(payload, {
            algorithm: 'RS256',
            privateKey: access_token_private_key,
            expiresIn: this.configService.get<string>(
                'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
            ),
        });
    }

    generateRefreshToken(payload: any, refresh_token_private_key: string) {
        return this.jwtService.sign(payload, {
            algorithm: 'RS256',
            privateKey: refresh_token_private_key,
            expiresIn: this.configService.get<string>(
                'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
            ),
        });
    }

    async getUserIfRefreshTokenMatched(
        user_id: string,
        refresh_token: string,
    ) {
        try {
            const user = await this.userRepository.findById(user_id);
            if (!user) {
                throw new UnauthorizedException();
            }
            const refresh_token_user = this.keyTokenService.queryKeyToken({
                userId: user_id,
                $in: { refreshToken: refresh_token }
            });


            if (!refresh_token_user) {
                throw new UnauthorizedException();
            }

            return user;
        } catch (error) {
            throw error;
        }
    }

    async verifyGoogleToken(idToken: string, res: Response) {
        const ticket = await this.client.verifyIdToken({
            idToken,
            audience: this.configService.get<string>('GG_CLIENT_ID'),
        });

        const payload = ticket.getPayload();
        if (!payload) throw new Error("Invalid Token");
        const verifiedUser = await this.validateGoogleUser({
            email: payload.email!,
            avatar: payload.picture!,
            name: payload.name!,
            verified: true,
        })

        const user = {
            _id: verifiedUser._id.toString(),
            user_email: verifiedUser.user_email,
            user_role: verifiedUser.user_role,
        } as UserInterface;

        return await this.login(user, res);
    }
}
