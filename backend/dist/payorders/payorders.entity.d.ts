import { User } from 'src/users/users.entity';
import { Operator } from 'src/operators/operators.entity';
import { DetailPayorder } from 'src/payorders/detail_payorder.entity';
import { ServiceType } from 'src/service/service.dto';
export declare class Payorder {
    id: number;
    reason: string;
    detail: string;
    cancellationDate: Date;
    cancellation: boolean;
    amountExtra: number;
    detailExtra: string;
    type: ServiceType;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    operator: Operator;
    detailPayorders: DetailPayorder[];
    user: User;
}
