import { TypePayordersService } from './type-payorders.service';
import { CreateTypePayorderDto } from './type-payorders.dto';
import { Request } from 'express';
export declare class TypePayordersController {
    private readonly typePayordersService;
    constructor(typePayordersService: TypePayordersService);
    getTypePayorders(): Promise<import("./type-payorders.entity").TypePayorder[]>;
    getTypePayorder(id: number): Promise<import("./type-payorders.entity").TypePayorder>;
    createTypePayorder(data: CreateTypePayorderDto, req: Request): Promise<import("./type-payorders.entity").TypePayorder>;
    updateTypePayorder(data: CreateTypePayorderDto, req: Request, id: number): Promise<import("./type-payorders.entity").TypePayorder>;
    deleteTypePayorder(id: number): Promise<boolean>;
}
