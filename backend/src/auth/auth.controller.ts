import { Body, Controller, Patch, Post, Req, UploadedFile, ParseFilePipeBuilder, UseInterceptors, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdminDto } from './auth.dto';
import { Public } from './auth.decorator';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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
  @Patch('update-password')
  async updatePassword(
    @Req() request: Request,
    @Body() payload: { password: string; oldPassword: string },
  ) {
    const user = request['user'];
    return this.authService.updatePassword(
      user?.sub,
      payload?.password,
      payload?.oldPassword,
    );
  }
  @Patch('update-profile')
  async updateProfile(@Req() request: Request, @Body() payload: CreateUserDto) {
    const user = request['user'];
    return this.authService.updateProfile(user?.sub, payload);
  }
  @Post('firm/one')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'static',
        filename: (req, file, cb) => {
          cb(null, 'firmOne.png');
        },
      }),
    }),
  )
  uploadFileFirmTwo(@UploadedFile() file: Express.Multer.File) {
    return {
      statusCode: 200,
      data: file.path,
    };
  }
  @Post('firm/two')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'static',
        filename: (req, file, cb) => {
          cb(null, 'firmTwo.png');
        },
      }),
    })
  )
  uploadFileFirmOne(@UploadedFile() file: Express.Multer.File) {
    return {
      statusCode: 200,
      data: file.path,
    };
  }
}
