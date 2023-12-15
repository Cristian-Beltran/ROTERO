export declare class createRoleDto {
    readonly name: string;
    readonly description: string;
    readonly pPersonal: boolean;
    readonly pOwner: boolean;
}
declare const updateRoleDto_base: import("@nestjs/mapped-types").MappedType<Partial<createRoleDto>>;
export declare class updateRoleDto extends updateRoleDto_base {
}
export {};
