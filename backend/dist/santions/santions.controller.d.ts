import { SantionsService } from './santions.service';
import { createSantionDto } from './santions.dto';
import { Request } from 'express';
export declare class SantionsController {
    private santionsService;
    constructor(santionsService: SantionsService);
    getSantions(initDate: string, endDate: string): Promise<import("./santions.entity").Santion[]>;
    getSantion(id: number): Promise<import("./santions.entity").Santion>;
    createSantion(data: createSantionDto, req: Request): Promise<import("./santions.entity").Santion>;
    updateSantion(id: number, data: createSantionDto, req: Request): Promise<import("./santions.entity").Santion>;
    deleteSantion(id: number): Promise<boolean>;
}
