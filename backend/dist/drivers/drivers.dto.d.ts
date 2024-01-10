import { Operator } from 'src/operators/operators.entity';
export declare class createDriverDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly ci: string;
    readonly cellphone: string;
    operatorId: number;
    operator?: Operator;
}
declare const updateDriverDto_base: import("@nestjs/mapped-types").MappedType<Partial<createDriverDto>>;
export declare class updateDriverDto extends updateDriverDto_base {
}
export {};
