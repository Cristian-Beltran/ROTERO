export declare class CreateUserDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly birthday: Date;
    readonly ci: string;
    readonly email: string;
    readonly cellphone: string;
    roleId?: number;
    password?: string;
    readonly lastLogin?: Date;
    role: any;
}
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export declare class FilterUserDto {
    readonly ci?: string;
    readonly id?: number;
    readonly email?: string;
    readonly birthday?: Date;
}
export {};
