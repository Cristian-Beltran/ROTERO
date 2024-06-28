import { User } from '../users/users.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
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
    vehicle: Vehicle;
    user: User;
}
