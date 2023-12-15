import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdminDto } from './auth.dto';
import { Public } from './auth.decorator';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('login')
  async login(@Body() payload: LoginAdminDto) {
    return this.authService.login(payload);
  }
  @Post('verify-token')
  async verify(@Req() request: Request) {
    const user = request['user'];
    return this.authService.verify(user?.sub);
  }
  @Post('update-password')
  async updatePassword(
    @Req() request: Request,
    @Body() payload: { password: string },
  ) {
    const user = request['user'];
    return this.authService.updatePassword(user?.sub, payload?.password);
  }
}
