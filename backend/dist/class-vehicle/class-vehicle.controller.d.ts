import { ClassVehicleService } from './class-vehicle.service';
import { CreateClassVehicleDto } from './class-vehicle.dto';
import { Request } from 'express';
export declare class ClassVehicleController {
    private classVehicleService;
    constructor(classVehicleService: ClassVehicleService);
    getClassVehicles(): Promise<import("./class-vehicle.entity").ClassVehicle[]>;
    getClassVehicle(id: number): Promise<import("./class-vehicle.entity").ClassVehicle>;
    createClassVehicle(data: CreateClassVehicleDto, req: Request): Promise<import("./class-vehicle.entity").ClassVehicle>;
    updateClassVehicle(id: number, data: CreateClassVehicleDto, req: Request): Promise<import("./class-vehicle.entity").ClassVehicle>;
    deleteClassVehicle(id: number): Promise<import("typeorm").DeleteResult>;
}
