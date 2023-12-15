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
    getOperators(): Promise<import("./operators.entity").Operator[]>;
    getOperator(id: number): Promise<import("./operators.entity").Operator>;
    createOperator(files: Express.Multer.File[], data: {
        operator: CreateOperatorDto;
        operatorUser: CreateUserDto;
        files: {
            route?: any;
            operatorCertification?: any;
            administrativeResolution?: any;
        };
    }, request: Request): Promise<{
        route?: string;
        operatorCertification?: string;
        administrativeResolution?: string;
        user: import("../users/users.entity").User;
        operator: import("../users/users.entity").User;
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
    } & import("./operators.entity").Operator>;
    updateOperator(files: Express.Multer.File[], id: number, data: {
        operator: UpdateOperatorDto;
        operatorUser: CreateUserDto;
        files: {
            route?: any;
            operatorCertification?: any;
            administrativeResolution?: any;
        };
    }, request: Request): Promise<{
        operator: import("./operators.entity").Operator;
        operatorUpdateUser: import("typeorm").UpdateResult;
    }>;
}
