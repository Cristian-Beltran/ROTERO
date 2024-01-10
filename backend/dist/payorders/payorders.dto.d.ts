export declare class createPayorderDto {
    readonly detail: string;
    operatorId: number;
    readonly typePayorderId: number;
}
declare const updatePayorderDto_base: import("@nestjs/mapped-types").MappedType<Partial<createPayorderDto>>;
export declare class updatePayorderDto extends updatePayorderDto_base {
}
export {};
