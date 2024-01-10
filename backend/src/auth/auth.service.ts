import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginAdminDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginAdminDto) {
    const user = await this.userService.getUserFilter({ email: data.email });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    if (user.permissionLevel === 'OPERADOR') {
      throw new UnauthorizedException('No tiene permisos para acceder');
    }

    await this.userService.updateUser(user.id, { lastLogin: new Date() });

    return {
      accessToken: await this.generateToken(
        user.id,
        user.ci,
        user.permissionLevel,
      ),
      ...user,
    };
  }

  async verify(userId: number) {
    const user = this.userService.getUserFilter({
      id: userId,
    });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    return user;
  }

  async updatePassword(id: number, password: string, oldPassword: string) {
    const user = await this.userService.getUserFilter({ id });
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    return await this.userService.updateUser(id, { password: passwordHash });
  }

  async updateProfile(id: number, data: CreateUserDto) {
    const user = await this.userService.getUserFilter({ id });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    return await this.userService.updateUser(id, data);
  }

  private async generateToken(
    id: number,
    ci: string,
    permissionLevel: string,
  ): Promise<string> {
    const payload = {
      sub: id,
      ci,
      permissionLevel,
    };
    return await this.jwtService.signAsync(payload);
  }
}
