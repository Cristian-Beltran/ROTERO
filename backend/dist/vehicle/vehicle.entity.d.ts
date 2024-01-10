import { User } from 'src/users/users.entity';
import { Operator } from 'src/operators/operators.entity';
import { Owner } from 'src/owners/owners.entity';
import { Driver } from 'src/drivers/drivers.entity';
import { ClassVehicle } from 'src/class-vehicle/class-vehicle.entity';
export declare enum TypeService {
    INTERPROVINCIAL = "interprovincial",
    INTERMUNICIPAL = "intermunicipal"
}
export declare enum Modality {
    PASAJERO = "pasajero",
    CARGA = "carga",
    PASAJERO_CARGA = "pasajero y carga"
}
export declare enum TypeVehicle {
    TAXI = "taxi",
    TAXI_TRUFI = "taxi trufi",
    TRUFI_MINIBUS = "trufi minibus"
}
export declare class Vehicle {
    id: number;
    typeService: TypeService;
    modality: Modality;
    maxLoad: number;
    maxPass: number;
    typeVehicle: TypeVehicle;
    model: string;
    brand: string;
    motor: string;
    chassis: string;
    soat: boolean;
    inspection: boolean;
    sure: string;
    plate: string;
    createdAt: Date;
    updatedAt: Date;
    operator: Operator;
    owner: Owner;
    driver: Driver;
    user: User;
    classVehicle: ClassVehicle;
}
