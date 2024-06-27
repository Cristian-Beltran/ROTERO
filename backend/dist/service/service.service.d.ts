import { Service } from './service.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ServiceType, createServiceDto, updateServiceDto } from './service.dto';
export declare class ServiceService {
    private serviceRepository;
    private userService;
    constructor(serviceRepository: Repository<Service>, userService: UsersService);
    getServices(type: ServiceType): Promise<Service[]>;
    getService(id: number): Promise<Service>;
    createService(data: createServiceDto, userId: number): Promise<Service>;
    updateService(id: number, data: updateServiceDto, userId: number): Promise<Service>;
    deleteService(id: number): Promise<Service>;
}
