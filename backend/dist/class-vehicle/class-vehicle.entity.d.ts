import { User } from 'src/users/users.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
export declare class ClassVehicle {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    vehicles: Vehicle[];
}
