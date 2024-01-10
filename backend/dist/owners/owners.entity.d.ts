import { User } from 'src/users/users.entity';
import { Operator } from 'src/operators/operators.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
export declare class Owner {
    id: number;
    firstName: string;
    lastName: string;
    ci: string;
    cellphone: string;
    createdAt: Date;
    updatedAt: Date;
    operator: Operator;
    vehicles: Vehicle[];
    user: User;
}
