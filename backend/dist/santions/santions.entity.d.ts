import { Operator } from 'src/operators/operators.entity';
import { Payorder } from 'src/payorders/payorders.entity';
import { TypeSantion } from 'src/type-santions/type-santions.entity';
import { User } from 'src/users/users.entity';
export declare class Santion {
    id: number;
    detail: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    operator: Operator;
    payorder: Payorder;
    typeSantion: TypeSantion;
}
