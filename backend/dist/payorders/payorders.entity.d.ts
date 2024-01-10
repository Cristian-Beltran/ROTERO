import { User } from 'src/users/users.entity';
import { Operator } from 'src/operators/operators.entity';
import { TypePayorder } from 'src/type-payorders/type-payorders.entity';
export declare class Payorder {
    id: number;
    detail: string;
    cancellationDate: Date;
    cancellation: boolean;
    createdAt: Date;
    updatedAt: Date;
    operator: Operator;
    user: User;
    typePayorder: TypePayorder;
}
