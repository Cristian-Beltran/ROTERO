import { User } from 'src/users/users.entity';
import { Operator } from 'src/operators/operators.entity';
export declare class Payorder {
    id: number;
    count: number;
    detail: string;
    cancellationDate: Date;
    cancellation: boolean;
    createdAt: Date;
    updatedAt: Date;
    operator: Operator;
    user: User;
}
