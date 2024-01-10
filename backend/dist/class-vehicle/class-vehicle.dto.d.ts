export declare class CreateClassVehicleDto {
    name: string;
    description: string;
}
declare const UpdateClassVehicleDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateClassVehicleDto>>;
export declare class UpdateClassVehicleDto extends UpdateClassVehicleDto_base {
}
export {};
