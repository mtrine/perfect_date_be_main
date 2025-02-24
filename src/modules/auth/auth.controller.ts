import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/decorators/user-infor.decorator';
import { UserInterface } from '../user/dto/response/user.interface';
import { Public } from 'src/decorators/public.decorator';
import { Request, Response } from 'express';
import { ResponseMessage } from 'src/decorators/response-message.decorator';
import { LocalAuthGuard } from 'src/guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

 

  @Public()
  @Post("google/login")
  @ResponseMessage('Login successfully')
  async googleCallback(@Body("idToken") idToken: string, @Res({ passthrough: true }) res: Response) {
    return this.authService.verifyGoogleToken(idToken, res);
  }

  @Get('refresh-token')
  @Public()
  @ResponseMessage('Refresh token successfully')
  handleRefreshToken(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    const refreshToken = req.cookies['refresh_token'];
    return this.authService.handleRefreshToken(refreshToken, response);
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('Login successfully')
  async login(@User() user: UserInterface, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(user, res);
  }
}
