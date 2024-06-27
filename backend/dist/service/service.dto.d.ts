export declare class createServiceDto {
    readonly name: string;
    readonly detail: string;
    readonly amount: number;
    readonly type: ServiceType;
}
declare const updateServiceDto_base: import("@nestjs/mapped-types").MappedType<Partial<createServiceDto>>;
export declare class updateServiceDto extends updateServiceDto_base {
}
export declare enum ServiceType {
    SANCION = "SANCION",
    PAGO = "PAGO"
}
export {};
