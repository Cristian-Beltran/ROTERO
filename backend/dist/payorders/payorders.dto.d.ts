export declare class createPayorderDto {
    readonly reason: string;
    readonly detail: string;
    operatorId: number;
    readonly amountExtra: number;
    readonly detailExtra: string;
    readonly detailPayorders: detailPayorder[];
}
declare const updatePayorderDto_base: import("@nestjs/mapped-types").MappedType<Partial<createPayorderDto>>;
export declare class updatePayorderDto extends updatePayorderDto_base {
}
export declare class detailPayorder {
    serviceId: number;
    count: number;
}
export {};
