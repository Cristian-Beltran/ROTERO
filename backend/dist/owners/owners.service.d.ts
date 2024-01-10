import { Owner } from './owners.entity';
import { Repository } from 'typeorm';
import { OperatorsService } from 'src/operators/operators.service';
import { UsersService } from 'src/users/users.service';
import { createOwnerDto, updateOwnerDto } from './owners.dto';
export declare class OwnersService {
    private ownerRepository;
    private operatorService;
    private userService;
    constructor(ownerRepository: Repository<Owner>, operatorService: OperatorsService, userService: UsersService);
    getOwners(operatorId: number): Promise<Owner[]>;
    getOwner(id: number): Promise<Owner>;
    createOwner(data: createOwnerDto, userId: number): Promise<{
        operator: import("../operators/operators.entity").Operator;
        user: import("../users/users.entity").User;
        firstName: string;
        lastName: string;
        ci: string;
        cellphone: string;
    } & Owner>;
    updateOwner(id: number, data: updateOwnerDto, userId: number): Promise<import("typeorm").UpdateResult>;
    deleteOwner(id: number): Promise<any>;
}
