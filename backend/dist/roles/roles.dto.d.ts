export declare class createRoleDto {
    readonly name: string;
    readonly description: string;
    readonly pDriver: boolean;
    readonly pOwner: boolean;
    readonly pOperator: boolean;
    readonly pRoute: boolean;
}
declare const updateRoleDto_base: import("@nestjs/mapped-types").MappedType<Partial<createRoleDto>>;
export declare class updateRoleDto extends updateRoleDto_base {
}
export {};
