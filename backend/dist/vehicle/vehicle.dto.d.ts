import { Modality, TypeService } from './vehicle.entity';
export declare class CreateVehicleDto {
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
    ownerId: number;
    operatorId: number;
    classVehicle: string;
}
declare const UpdateVehicleDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateVehicleDto>>;
export declare class UpdateVehicleDto extends UpdateVehicleDto_base {
}
export {};
