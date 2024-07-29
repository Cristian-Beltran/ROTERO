import { Rossete } from './rossetes.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateRosseteDto, UpdateRosseteDto } from './rossetes.dto';
import { JwtService } from '@nestjs/jwt';
import { VehicleService } from 'src/vehicle/vehicle.service';
export declare class RossetesService {
    private rosseteRepository;
    private jwtService;
    private userService;
    private vehicleService;
    constructor(rosseteRepository: Repository<Rossete>, jwtService: JwtService, userService: UsersService, vehicleService: VehicleService);
    readQrRossete(token: string, userId: number): Promise<Rossete>;
    getRossetes(): Promise<Rossete[]>;
    getRossete(id: number): Promise<Rossete>;
    createRossete(data: CreateRosseteDto, userId: number): Promise<Rossete>;
    updateRossete(id: number, data: UpdateRosseteDto, userId: number): Promise<Rossete>;
    deleteRossete(id: number): Promise<boolean>;
    downRossete(id: number): Promise<Rossete>;
}
