import { Driver } from './drivers.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { OperatorsService } from 'src/operators/operators.service';
import { createDriverDto, updateDriverDto } from './drivers.dto';
export declare class DriversService {
    private driverRepository;
    private userService;
    private operatorService;
    constructor(driverRepository: Repository<Driver>, userService: UsersService, operatorService: OperatorsService);
    getDrivers(operatorId: number): Promise<Driver[]>;
    getDriver(id: number): Promise<Driver>;
    createDriver(data: createDriverDto, userId: number): Promise<Driver>;
    updateDriver(id: number, data: updateDriverDto, userId: number): Promise<Driver>;
    deleteDriver(id: number): Promise<Driver>;
}
