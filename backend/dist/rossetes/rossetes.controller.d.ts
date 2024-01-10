import { RossetesService } from './rossetes.service';
import { CreateRosseteDto, UpdateRosseteDto } from './rossetes.dto';
import { Request, Response } from 'express';
import { PdfService } from 'src/pdf/pdf.service';
export declare class RossetesController {
    private rosseteService;
    private pdfService;
    constructor(rosseteService: RossetesService, pdfService: PdfService);
    getRossetes(): Promise<import("./rossetes.entity").Rossete[]>;
    readQrRossete(token: string, req: Request): Promise<import("./rossetes.entity").Rossete>;
    getRossete(id: number): Promise<import("./rossetes.entity").Rossete>;
    createRossete(data: CreateRosseteDto, req: Request): Promise<import("./rossetes.entity").Rossete>;
    updateRossete(data: UpdateRosseteDto, req: Request, id: number): Promise<import("./rossetes.entity").Rossete>;
    deleteRossete(id: number): Promise<boolean>;
    generateRossete(id: number, res: Response): Promise<void>;
}
