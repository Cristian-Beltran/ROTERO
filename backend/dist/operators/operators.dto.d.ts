export declare class CreateOperatorDto {
    businessName: string;
    legalRepresentative: string;
    owner: string;
    seprec: string;
    nit: string;
    entityMatris: string;
    color: string;
    route: string;
    dateRa: Date;
    initialAffiliates?: number;
    currentAffiliates?: number;
    tecnicalNumber: string;
    legalNumber: string;
    observations: string;
    validity: Date;
}
declare const UpdateOperatorDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateOperatorDto>>;
export declare class UpdateOperatorDto extends UpdateOperatorDto_base {
}
export declare class FilterUserDto {
    readonly ci?: string;
    readonly id?: number;
    readonly email?: string;
    readonly birthday?: Date;
}
export {};
