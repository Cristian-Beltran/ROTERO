import { UsersService } from './users.service';
import { PermissionLevel } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    createUser(data: CreateUserDto, params: {
        permissionLevel: PermissionLevel;
    }): Promise<import("./users.entity").User>;
    updateUser(id: number, data: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: number): Promise<import("typeorm").UpdateResult>;
    getUsers(params: {
        permissionLevel: PermissionLevel;
    }): Promise<import("./users.entity").User[]>;
    getUser(id: number): Promise<import("./users.entity").User>;
}
