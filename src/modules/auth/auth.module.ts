import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { KeyTokenModule } from '../key-token/key-token.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenStrategy } from 'src/strategies/jwt-access.strategy';
import { RoleModule } from '../role/role.module';
import { LocalStrategy } from 'src/strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    KeyTokenModule,
    RoleModule,
    PassportModule,
    JwtModule.register({
      signOptions: {
        algorithm: 'RS256',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessTokenStrategy, LocalStrategy],
})
export class AuthModule { }
