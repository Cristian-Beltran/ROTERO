import { Status } from './rossetes.entity';
export declare class CreateRosseteDto {
    expiration: string;
    status: Status;
    routeId: number;
}
declare const UpdateRosseteDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRosseteDto>>;
export declare class UpdateRosseteDto extends UpdateRosseteDto_base {
}
export {};
