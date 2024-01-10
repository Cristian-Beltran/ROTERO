import { VehicleService } from './vehicle.service';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicle.dto';
import { Request, Response } from 'express';
import { PdfService } from 'src/pdf/pdf.service';
export declare class VehicleController {
    private vehicleService;
    private pdfService;
    constructor(vehicleService: VehicleService, pdfService: PdfService);
    getVehicleForClass(): Promise<import("./vehicle.entity").Vehicle[]>;
    getVehicleByPlate(plate: string): Promise<import("./vehicle.entity").Vehicle>;
    getVehicles(id: number): Promise<import("./vehicle.entity").Vehicle[]>;
    getVehicle(id: number): Promise<import("./vehicle.entity").Vehicle>;
    createVehicle(data: CreateVehicleDto, req: Request): Promise<import("./vehicle.entity").Vehicle>;
    updateVehicle(id: number, data: UpdateVehicleDto, req: Request): Promise<import("./vehicle.entity").Vehicle>;
    deleteVehicle(id: number): Promise<import("./vehicle.entity").Vehicle>;
    generateCertificateOperator(id: number, res: Response): Promise<void>;
}
