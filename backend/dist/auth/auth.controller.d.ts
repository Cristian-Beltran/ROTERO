/// <reference types="multer" />
import { AuthService } from './auth.service';
import { LoginAdminDto } from './auth.dto';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/users.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(payload: LoginAdminDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        birthday: Date;
        ci: string;
        email: string;
        password: string;
        permissionLevel: import("../users/users.entity").PermissionLevel;
        isActive: boolean;
        cellphone: string;
        lastLogin: Date;
        createdAt: Date;
        updatedAt: Date;
        role: import("../roles/roles.entity").Role;
        rolesUpdate: import("../roles/roles.entity").Role[];
        operatorsUpdate: import("../operators/operators.entity").Operator[];
        payordersUpdate: import("../payorders/payorders.entity").Payorder[];
        ownersUpdate: import("../owners/owners.entity").Owner[];
        driversUpdate: import("../drivers/drivers.entity").Driver[];
        vehiclesUpdate: import("../vehicle/vehicle.entity").Vehicle[];
        routesUpdate: import("../routes/routes.entity").Route[];
        rossetesUpdate: import("../rossetes/rossetes.entity").Rossete[];
        classVehicleUpdate: import("../class-vehicle/class-vehicle.entity").ClassVehicle[];
        servicesUpdate: import("../service/service.entity").Service[];
        accessToken: string;
    }>;
    verify(request: Request): Promise<import("../users/users.entity").User>;
    updatePassword(request: Request, payload: {
        password: string;
        oldPassword: string;
    }): Promise<import("typeorm").UpdateResult>;
    updateProfile(request: Request, payload: CreateUserDto): Promise<import("typeorm").UpdateResult>;
    uploadFileFirmTwo(file: Express.Multer.File): {
        statusCode: number;
        data: string;
    };
    uploadFileFirmOne(file: Express.Multer.File): {
        statusCode: number;
        data: string;
    };
}
