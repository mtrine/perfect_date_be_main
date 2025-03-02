import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy as GoogleTokenStrategy } from "passport-google-verify-token";
import { AuthService } from "src/modules/auth/auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(GoogleTokenStrategy) {
    constructor(private authService: AuthService) {
        super({
            clientID: process.env.GG_CLIENT_ID, // Lấy từ biến môi trường
        });
    }

    async validate(parsedToken: any, googleId: string, done: Function) {

        if (!parsedToken.body) {
            return done(new Error('Invalid Google Token'), null);
        }
        const { email, name, picture, email_verified } = JSON.parse(parsedToken.body);
        const user = await this.authService.validateGoogleUser({
            email: email,
            name: name || '',
            avatar: picture || '',
            verified: email_verified || false
        });
        return done(null, user);
    }
}
