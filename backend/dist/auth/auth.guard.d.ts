import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private reflector;
    constructor(jwtService: JwtService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
    permissionLevelSuperAdmin(contex: ExecutionContext): boolean;
    permissionLevelAdmin(contex: ExecutionContext): boolean;
    permissionLevelTecnical(contex: ExecutionContext): boolean;
    permissionLevelConsultor(contex: ExecutionContext): boolean;
    permissionLevelOperator(contex: ExecutionContext): boolean;
}
