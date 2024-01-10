import { Santion } from './santions.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { OperatorsService } from 'src/operators/operators.service';
import { PayordersService } from 'src/payorders/payorders.service';
import { TypeSantionsService } from 'src/type-santions/type-santions.service';
import { createSantionDto, updateSantionDto } from './santions.dto';
export declare class SantionsService {
    private santionRepository;
    private userService;
    private operatorService;
    private payorderService;
    private typeSantionService;
    constructor(santionRepository: Repository<Santion>, userService: UsersService, operatorService: OperatorsService, payorderService: PayordersService, typeSantionService: TypeSantionsService);
    getSantions(initDate: string, endDate: string): Promise<Santion[]>;
    getSantion(id: number): Promise<Santion>;
    createSantion(data: createSantionDto, userId: number): Promise<Santion>;
    updateSantion(id: number, data: updateSantionDto, userId: number): Promise<Santion>;
    deleteSantion(id: number): Promise<boolean>;
}
