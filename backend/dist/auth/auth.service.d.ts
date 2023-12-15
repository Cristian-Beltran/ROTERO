import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(data: LoginAdminDto): Promise<{
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
    verify(userId: number): Promise<import("../users/users.entity").User>;
    updatePassword(id: number, password: string): Promise<import("typeorm").UpdateResult>;
    private generateToken;
}
