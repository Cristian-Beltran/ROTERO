/// <reference types="multer" />
import { OperatorsService } from './operators.service';
import { CreateOperatorDto, UpdateOperatorDto } from './operators.dto';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/users.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class OperatorsController {
    private operatorService;
    private cloudinaryService;
    constructor(operatorService: OperatorsService, cloudinaryService: CloudinaryService);
    getTotalEmployeeOperators(): Promise<any[]>;
    getOperators(): Promise<import("./operators.entity").Operator[]>;
    deleteOperator(id: number): Promise<boolean>;
    authorizeOperator(id: number): Promise<boolean>;
    getOperator(id: number): Promise<import("./operators.entity").Operator>;
    createOperator(data: {
        operator: CreateOperatorDto;
        operatorUser: CreateUserDto;
    }, request: Request): Promise<{
        user: import("../users/users.entity").User;
        operator: import("../users/users.entity").User;
        state: import("./operators.entity").State;
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
    } & import("./operators.entity").Operator>;
    updateOperator(id: number, data: {
        operator: UpdateOperatorDto;
        operatorUser: CreateUserDto;
    }, request: Request): Promise<{
        operator: import("./operators.entity").Operator;
        operatorUpdateUser: import("typeorm").UpdateResult;
    }>;
    uploadFiles(id: number, file: Express.Multer.File, params: {
        location: string;
    }): Promise<import("typeorm").UpdateResult>;
}
