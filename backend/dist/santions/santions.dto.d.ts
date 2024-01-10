export declare class createSantionDto {
    readonly detail: string;
    operatorId: number;
    readonly typeSantionId: number;
}
declare const updateSantionDto_base: import("@nestjs/mapped-types").MappedType<Partial<createSantionDto>>;
export declare class updateSantionDto extends updateSantionDto_base {
}
export {};
