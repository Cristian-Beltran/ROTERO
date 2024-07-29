import { User } from '../users/users.entity';
import { Operator } from 'src/operators/operators.entity';
export declare class Route {
    id: number;
    description: string;
    distance: number;
    hourEntry: string;
    hourExit: string;
    dayEntry: string;
    dayExit: string;
    routeFile: string;
    routeArray: string;
    createdAt: Date;
    updatedAt: Date;
    operator: Operator;
    user: User;
}
