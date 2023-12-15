import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Operator } from './operators.entity';
import { CreateOperatorDto, UpdateOperatorDto } from './operators.dto';
import { CreateUserDto, UpdateUserDto } from 'src/users/users.dto';
export declare class OperatorsService {
    private operatorRepository;
    private userService;
    constructor(operatorRepository: Repository<Operator>, userService: UsersService);
    getOperators(): Promise<Operator[]>;
    getOperator(id: number): Promise<Operator>;
    createOperator(data: CreateOperatorDto, operator: CreateUserDto, userId: number, fields?: {
        route?: string;
        operatorCertification?: string;
        administrativeResolution?: string;
    }): Promise<{
        route?: string;
        operatorCertification?: string;
        administrativeResolution?: string;
        user: import("src/users/users.entity").User;
        operator: import("src/users/users.entity").User;
        businessName: string;
        legalRepresentative: string;
        owner: string;
        seprec: string;
        nit: string;
        dateRa: Date;
        initialAffiliates: number;
        currentAffiliates: number;
        state: import("./operators.entity").State;
        tecnicalNumber: string;
        legalNumber: string;
        observations: string;
        validity: Date;
    } & Operator>;
    updateOperator(id: number, data: UpdateOperatorDto, operatorUser: UpdateUserDto, userId: number, fields?: {
        route?: string;
        operatorCertification?: string;
        administrativeResolution?: string;
    }): Promise<{
        operator: Operator;
        operatorUpdateUser: import("typeorm").UpdateResult;
    }>;
}
