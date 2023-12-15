import { Repository } from 'typeorm';
import { User } from './users.entity';
import { PermissionLevel } from './users.entity';
import { CreateUserDto, FilterUserDto, UpdateUserDto } from './users.dto';
import { Role } from 'src/roles/roles.entity';
export declare class UsersService {
    private userRepository;
    private roleRepository;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Role>);
    getUserFilter(filter: FilterUserDto): Promise<User>;
    getUser(id: number): Promise<User>;
    getUsers(permissionLevel: PermissionLevel): Promise<User[]>;
    createUser(permissionLevel: PermissionLevel, data: CreateUserDto): Promise<User>;
    updateUser(id: number, data: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: number): Promise<import("typeorm").UpdateResult>;
}
