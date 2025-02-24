import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { access_token_public_key } from '../constants/jwt.constants'
import { UserRepository } from 'src/modules/user/user.repo';
import { RoleRepository } from 'src/modules/role/role.repo';
import { CustomException } from 'src/exception-handle/custom-exception';
import { ErrorCode } from 'src/enums/error-code.enum';
@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: access_token_public_key,
        });
    }

    async validate(payload: any) {
        const user = await this.userRepository.findById(payload._id)
        if (!user) throw new CustomException(ErrorCode.USER_NOT_REGISTER)
        const temp = await this.roleRepository.findOneByQuery({ role_name: user?.user_role })
        return {
            _id: user._id,
            user_email: user.user_email,
            user_name: user.user_name,
            user_role: user.user_role,
            role_permissions: temp?.role_permissions ?? []
        };
    }
}
