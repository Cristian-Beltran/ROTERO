import { Repository } from 'typeorm';
import { Role } from './roles.entity';
import { createRoleDto, updateRoleDto } from './roles.dto';
import { UsersService } from 'src/users/users.service';
export declare class RolesService {
    private roleService;
    private userService;
    constructor(roleService: Repository<Role>, userService: UsersService);
    getRoles(): Promise<Role[]>;
    getRole(id: number): Promise<Role>;
    createRole(data: createRoleDto, userId: number): Promise<{
        user: import("../users/users.entity").User;
        isActive: boolean;
        name: string;
        description: string;
        pPersonal: boolean;
        pOwner: boolean;
    } & Role>;
    updateRole(id: number, data: updateRoleDto, userId: number): Promise<import("typeorm").UpdateResult>;
    deleteRole(id: number): Promise<import("typeorm").UpdateResult>;
}
