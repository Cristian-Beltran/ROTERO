import { OwnersService } from './owners.service';
import { createOwnerDto, updateOwnerDto } from './owners.dto';
import { Request } from 'express';
export declare class OwnersController {
    private ownerService;
    constructor(ownerService: OwnersService);
    getOwners(operatorId: number): Promise<import("./owners.entity").Owner[]>;
    getOwner(id: number): Promise<import("./owners.entity").Owner>;
    createOwner(data: createOwnerDto, req: Request): Promise<{
        operator: import("../operators/operators.entity").Operator;
        user: import("../users/users.entity").User;
        firstName: string;
        lastName: string;
        ci: string;
    } & import("./owners.entity").Owner>;
    updateOwner(id: number, data: updateOwnerDto, req: Request): Promise<import("typeorm").UpdateResult>;
    deleteOwner(id: number): Promise<any>;
}
