import { AuthService } from './auth.service';
import { LoginAdminDto } from './auth.dto';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(payload: LoginAdminDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        birthday: Date;
        ci: string;
        email: string;
        password: string;
        permissionLevel: import("../users/users.entity").PermissionLevel;
        isActive: boolean;
        cellphone: string;
        lastLogin: Date;
        createdAt: Date;
        updatedAt: Date;
        role: import("../roles/roles.entity").Role;
        rolesUpdate: import("../roles/roles.entity").Role[];
        operatorsUpdate: import("../operators/operators.entity").Operator[];
        accessToken: string;
    }>;
    verify(request: Request): Promise<import("../users/users.entity").User>;
    updatePassword(request: Request, payload: {
        password: string;
    }): Promise<import("typeorm").UpdateResult>;
}
