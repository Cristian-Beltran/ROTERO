import { User } from 'src/users/users.entity';
import { Operator } from 'src/operators/operators.entity';
import { Owner } from 'src/owners/owners.entity';
export declare enum TypeService {
    INTERPROVINCIAL = "interprovincial",
    INTERMUNICIPAL = "intermunicipal"
}
export declare enum Modality {
    PASAJERO = "pasajero",
    CARGA = "carga",
    PASAJERO_CARGA = "pasajero y carga"
}
export declare class Vehicle {
    id: number;
    typeService: TypeService;
    modality: Modality;
    maxLoad: number;
    maxPass: number;
    typeVehicle: string;
    model: string;
    brand: string;
    motor: string;
    chassis: string;
    soat: boolean;
    inspection: boolean;
    plate: string;
    classVehicle: string;
    createdAt: Date;
    updatedAt: Date;
    operator: Operator;
    owner: Owner;
    user: User;
}
