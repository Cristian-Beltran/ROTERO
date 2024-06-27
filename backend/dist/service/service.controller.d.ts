import { ServiceService } from './service.service';
import { Request } from 'express';
import { ServiceType, createServiceDto, updateServiceDto } from './service.dto';
export declare class ServiceController {
    private serviceService;
    constructor(serviceService: ServiceService);
    getServices(type: ServiceType): Promise<import("./service.entity").Service[]>;
    getService(id: number): Promise<import("./service.entity").Service>;
    createService(data: createServiceDto, request: Request): Promise<import("./service.entity").Service>;
    updateService(id: number, data: updateServiceDto, request: Request): Promise<import("./service.entity").Service>;
    deleteService(id: number): Promise<import("./service.entity").Service>;
}
