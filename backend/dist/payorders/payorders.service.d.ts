import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Payorder } from './payorders.entity';
import { createPayorderDto, updatePayorderDto } from './payorders.dto';
import { OperatorsService } from 'src/operators/operators.service';
import { TypePayordersService } from 'src/type-payorders/type-payorders.service';
export declare class PayordersService {
    private payorderRepository;
    private userService;
    private operatorService;
    private typePayoderService;
    constructor(payorderRepository: Repository<Payorder>, userService: UsersService, operatorService: OperatorsService, typePayoderService: TypePayordersService);
    getPayorders(initDate: string, endDate: string): Promise<Payorder[]>;
    getPayorder(id: number): Promise<Payorder>;
    createPayorder(data: createPayorderDto, userId: number): Promise<{
        operator: import("../operators/operators.entity").Operator;
        user: import("../users/users.entity").User;
        typePayorder: import("../type-payorders/type-payorders.entity").TypePayorder;
        detail: string;
    } & Payorder>;
    updatePayorder(id: number, data: updatePayorderDto, userId: number): Promise<import("typeorm").UpdateResult>;
    deletePayorder(id: number): Promise<any>;
    cancelPayorder(id: number): Promise<import("typeorm").UpdateResult>;
}
