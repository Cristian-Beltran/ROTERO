import { User } from 'src/users/users.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
export declare enum Status {
    BAJA = "BAJA",
    DUPLICADO = "DUPLICADO",
    REIMPRESO = "REIMPRESO",
    REPOSICION = "REPOSICION",
    VIGENTE = "VIGENTE"
}
export declare class Rossete {
    id: number;
    expiration: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    vehicle: Vehicle;
    user: User;
}
