import { User } from 'src/users/users.entity';
import { Operator } from 'src/operators/operators.entity';
export declare class Driver {
    id: number;
    firstName: string;
    lastName: string;
    ci: string;
    cellphone: string;
    createdAt: Date;
    updatedAt: Date;
    operator: Operator;
    user: User;
}
