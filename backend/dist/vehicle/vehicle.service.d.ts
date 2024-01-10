import { Vehicle } from './vehicle.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { OperatorsService } from 'src/operators/operators.service';
import { DriversService } from 'src/drivers/drivers.service';
import { OwnersService } from 'src/owners/owners.service';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicle.dto';
import { ClassVehicleService } from 'src/class-vehicle/class-vehicle.service';
import { PdfService } from 'src/pdf/pdf.service';
export declare class VehicleService {
    private vechileRepository;
    private userService;
    private operatorService;
    private driverService;
    private ownerService;
    private classVehicleService;
    private pdfService;
    constructor(vechileRepository: Repository<Vehicle>, userService: UsersService, operatorService: OperatorsService, driverService: DriversService, ownerService: OwnersService, classVehicleService: ClassVehicleService, pdfService: PdfService);
    getVehicleForClass(): Promise<Vehicle[]>;
    getVehicles(operatorId: number): Promise<Vehicle[]>;
    getVehicleByPlate(plate: string): Promise<Vehicle>;
    getVehicle(id: number): Promise<Vehicle>;
    createVehicle(data: CreateVehicleDto, userId: number): Promise<Vehicle>;
    updateVehicle(id: number, data: UpdateVehicleDto, userId: number): Promise<Vehicle>;
    deleteVehicle(id: number): Promise<Vehicle>;
    getVehicleById(plate: string): Promise<any>;
}
