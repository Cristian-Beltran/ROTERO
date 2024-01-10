import { Request } from 'express';
import { TypeSantionsService } from './type-santions.service';
import { createTypeSantionDto, updateTypeSantionDto } from './type-santions.dto';
export declare class TypeSantionsController {
    private typeSantionsService;
    constructor(typeSantionsService: TypeSantionsService);
    getTypeSantions(): Promise<import("./type-santions.entity").TypeSantion[]>;
    getTypeSantion(id: number): Promise<import("./type-santions.entity").TypeSantion>;
    createTypeSantion(data: createTypeSantionDto, req: Request): Promise<import("./type-santions.entity").TypeSantion>;
    updateTypeSantion(id: number, data: updateTypeSantionDto, req: Request): Promise<import("./type-santions.entity").TypeSantion>;
    deleteTypeSantion(id: number): Promise<boolean>;
}
