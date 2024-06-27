import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Operator } from './operators.entity';
import { CreateOperatorDto, UpdateOperatorDto } from './operators.dto';
import { CreateUserDto, UpdateUserDto } from 'src/users/users.dto';
import { State } from './operators.entity';
export declare class OperatorsService {
    private operatorRepository;
    private userService;
    constructor(operatorRepository: Repository<Operator>, userService: UsersService);
    getTotalEmployeeOperators(): Promise<any[]>;
    getOperators(): Promise<Operator[]>;
    getOperator(id: number): Promise<Operator>;
    createOperator(data: CreateOperatorDto, operator: CreateUserDto, userId: number): Promise<{
        user: import("src/users/users.entity").User;
        operator: import("src/users/users.entity").User;
        state: State;
        businessName: string;
        legalRepresentative: string;
        owner: string;
        seprec: string;
        nit: string;
        entityMatris: string;
        color: string;
        route: string;
        dateRa: Date;
        initialAffiliates?: number;
        currentAffiliates?: number;
        tecnicalNumber: string;
        legalNumber: string;
        observations: string;
        validity?: Date;
    } & Operator>;
    updateOperator(id: number, data: UpdateOperatorDto, operatorUser: UpdateUserDto, userId: number): Promise<{
        operator: Operator;
        operatorUpdateUser: import("typeorm").UpdateResult;
    }>;
    uploadFiles(id: number, url: string, location: string): Promise<import("typeorm").UpdateResult>;
    deleteOperator(id: number): Promise<boolean>;
    authorizeOperator(id: number): Promise<boolean>;
}
