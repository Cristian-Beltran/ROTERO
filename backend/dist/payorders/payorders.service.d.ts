import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Payorder } from './payorders.entity';
import { createPayorderDto, updatePayorderDto } from './payorders.dto';
import { OperatorsService } from 'src/operators/operators.service';
import { DetailPayorder } from './detail_payorder.entity';
import { ServiceService } from 'src/service/service.service';
export declare class PayordersService {
    private payorderRepository;
    private detailPayorderRepository;
    private userService;
    private operatorService;
    private serviceService;
    constructor(payorderRepository: Repository<Payorder>, detailPayorderRepository: Repository<DetailPayorder>, userService: UsersService, operatorService: OperatorsService, serviceService: ServiceService);
    getPayorders(initDate: string, endDate: string): Promise<Payorder[]>;
    getPayorder(id: number): Promise<{
        detailPayorders: {
            serviceId: number;
            name: string;
            amount: number;
            count: number;
            total: number;
        }[];
        amount: number;
        id: number;
        reason: string;
        detail: string;
        cancellationDate: Date;
        cancellation: boolean;
        amountExtra: number;
        detailExtra: string;
        type: import("../service/service.dto").ServiceType;
        total: number;
        createdAt: Date;
        updatedAt: Date;
        operator: import("../operators/operators.entity").Operator;
        user: import("../users/users.entity").User;
    }>;
    createPayorder(data: createPayorderDto, userId: number): Promise<Payorder>;
    updatePayorder(id: number, data: updatePayorderDto, userId: number): Promise<import("typeorm").UpdateResult>;
    deletePayorder(id: number): Promise<any>;
    cancelPayorder(id: number): Promise<import("typeorm").UpdateResult>;
}
