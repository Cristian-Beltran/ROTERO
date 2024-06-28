export declare class CreateRouteDto {
    description: string;
    distance: number;
    hourEntry: string;
    hourExit: string;
    dayEntry: string;
    dayExit: string;
    routeArray: [];
    vehicleId: number;
}
declare const UpdateRouteDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRouteDto>>;
export declare class UpdateRouteDto extends UpdateRouteDto_base {
}
export {};
