import { RolesService } from './roles.service';
import { createRoleDto, updateRoleDto } from './roles.dto';
import { Request } from 'express';
export declare class RolesController {
    private roleService;
    constructor(roleService: RolesService);
    getRoles(): Promise<import("./roles.entity").Role[]>;
    getRole(id: number): Promise<import("./roles.entity").Role>;
    createRole(data: createRoleDto, request: Request): Promise<{
        user: import("../users/users.entity").User;
        isActive: boolean;
        name: string;
        description: string;
        pDriver: boolean;
        pOwner: boolean;
        pOperator: boolean;
        pRoute: boolean;
    } & import("./roles.entity").Role>;
    updateRole(id: number, data: updateRoleDto, request: Request): Promise<import("typeorm").UpdateResult>;
    deleteRole(id: number): Promise<import("typeorm").UpdateResult>;
}
