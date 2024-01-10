export declare class CreateTypePayorderDto {
    readonly name: string;
    readonly detail: string;
    readonly amount: number;
}
declare const UpdateTypePayorderDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTypePayorderDto>>;
export declare class UpdateTypePayorderDto extends UpdateTypePayorderDto_base {
}
export {};
