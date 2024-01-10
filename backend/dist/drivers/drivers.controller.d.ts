import { DriversService } from './drivers.service';
import { createDriverDto, updateDriverDto } from './drivers.dto';
import { Request } from 'express';
export declare class DriversController {
    private driverService;
    constructor(driverService: DriversService);
    getDrivers(id: number): Promise<import("./drivers.entity").Driver[]>;
    getDriver(id: number): Promise<import("./drivers.entity").Driver>;
    createDriver(data: createDriverDto, req: Request): Promise<import("./drivers.entity").Driver>;
    updateDriver(id: number, data: updateDriverDto, req: Request): Promise<import("./drivers.entity").Driver>;
    deleteDriver(id: number): Promise<import("./drivers.entity").Driver>;
}
