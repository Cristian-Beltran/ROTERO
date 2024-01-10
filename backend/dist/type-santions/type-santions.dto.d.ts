import { Severity } from './type-santions.entity';
export declare class createTypeSantionDto {
    readonly name: string;
    readonly detail: string;
    readonly amount: number;
    readonly severity: Severity;
}
declare const updateTypeSantionDto_base: import("@nestjs/mapped-types").MappedType<Partial<createTypeSantionDto>>;
export declare class updateTypeSantionDto extends updateTypeSantionDto_base {
}
export {};
