import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constans';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { PermissionLevel } from 'src/users/users.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  permissionLevelSuperAdmin(contex: ExecutionContext): boolean {
    const request = contex.switchToHttp().getRequest();
    const user = request['user'];
    if (user && user.permissionLevel === PermissionLevel.SUPERADMINISTRADOR) {
      return true;
    }
    throw new UnauthorizedException('No tiene permisos para acceder');
  }
  permissionLevelAdmin(contex: ExecutionContext): boolean {
    const request = contex.switchToHttp().getRequest();
    const user = request['user'];
    if (
      user &&
      (user.permissionLevel === PermissionLevel.ADMINISTRADOR ||
        user.permissionLevel === PermissionLevel.SUPERADMINISTRADOR)
    ) {
      return true;
    }
    throw new UnauthorizedException('No tiene permisos para acceder');
  }
  permissionLevelTecnical(contex: ExecutionContext): boolean {
    const request = contex.switchToHttp().getRequest();
    const user = request['user'];
    if (
      user &&
      (user.permissionLevel === PermissionLevel.TECNICO ||
        user.permissionLevel === PermissionLevel.ADMINISTRADOR ||
        user.permissionLevel === PermissionLevel.SUPERADMINISTRADOR)
    ) {
      return true;
    }
    throw new UnauthorizedException('No tiene permisos para acceder');
  }
  permissionLevelConsultor(contex: ExecutionContext): boolean {
    const request = contex.switchToHttp().getRequest();
    const user = request['user'];
    if (
      user &&
      (user.permissionLevel === PermissionLevel.CONSULTOR ||
        user.permissionLevel === PermissionLevel.TECNICO ||
        user.permissionLevel === PermissionLevel.ADMINISTRADOR ||
        user.permissionLevel === PermissionLevel.SUPERADMINISTRADOR)
    ) {
      return true;
    }
    throw new UnauthorizedException('No tiene permisos para acceder');
  }
  permissionLevelOperator(contex: ExecutionContext): boolean {
    const request = contex.switchToHttp().getRequest();
    const user = request['user'];
    if (
      user &&
      (user.permissionLevel === PermissionLevel.OPERADOR ||
        user.permissionLevel === PermissionLevel.CONSULTOR ||
        user.permissionLevel === PermissionLevel.TECNICO ||
        user.permissionLevel === PermissionLevel.ADMINISTRADOR ||
        user.permissionLevel === PermissionLevel.SUPERADMINISTRADOR)
    ) {
      return true;
    }
    throw new UnauthorizedException('No tiene permisos para acceder');
  }
}
