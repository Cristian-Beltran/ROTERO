import { ClassVehicle } from './class-vehicle.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateClassVehicleDto, UpdateClassVehicleDto } from './class-vehicle.dto';
export declare class ClassVehicleService {
    private classVehicleRepository;
    private userService;
    constructor(classVehicleRepository: Repository<ClassVehicle>, userService: UsersService);
    getClassVehicles(): Promise<ClassVehicle[]>;
    getClassVehicle(id: number): Promise<ClassVehicle>;
    createClassVehicle(data: CreateClassVehicleDto, userId: number): Promise<ClassVehicle>;
    updateClassVehicle(id: number, data: UpdateClassVehicleDto, userId: number): Promise<ClassVehicle>;
    deleteClassVehicle(id: number): Promise<import("typeorm").DeleteResult>;
}
