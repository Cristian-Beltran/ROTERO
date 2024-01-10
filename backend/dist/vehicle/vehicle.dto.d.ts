import { Modality, TypeService, TypeVehicle } from './vehicle.entity';
export declare class CreateVehicleDto {
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
    ownerId: number;
    driverId: number;
    operatorId: number;
    classVehicleId: number;
}
declare const UpdateVehicleDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateVehicleDto>>;
export declare class UpdateVehicleDto extends UpdateVehicleDto_base {
}
export {};
