export declare class createOwnerDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly ci: string;
    operatorId: number;
}
declare const updateOwnerDto_base: import("@nestjs/mapped-types").MappedType<Partial<createOwnerDto>>;
export declare class updateOwnerDto extends updateOwnerDto_base {
}
export {};
