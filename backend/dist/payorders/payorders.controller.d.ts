import { PayordersService } from './payorders.service';
import { createPayorderDto } from './payorders.dto';
import { Request, Response } from 'express';
import { PdfService } from 'src/pdf/pdf.service';
export declare class PayordersController {
    private payorderService;
    private pdfService;
    constructor(payorderService: PayordersService, pdfService: PdfService);
    getPayorders(initDate: string, endDate: string): Promise<import("./payorders.entity").Payorder[]>;
    createPayorder(data: createPayorderDto, req: Request): Promise<import("./payorders.entity").Payorder>;
    generateReportPayorders(res: Response, initDate: string, endDate: string): Promise<void>;
    updatePayorder(id: number, data: createPayorderDto, req: Request): Promise<import("typeorm").UpdateResult>;
    deletePayorder(id: number): Promise<any>;
    cancelPayorder(id: number): Promise<import("typeorm").UpdateResult>;
    generatePayorder(id: number, res: Response, req: Request): Promise<void>;
    getPayorder(id: number): Promise<{
        detailPayorders: {
            serviceId: number;
            name: string;
            amount: number;
            count: number;
            total: number;
        }[];
        amount: number;
        id: number;
        reason: string;
        detail: string;
        cancellationDate: Date;
        cancellation: boolean;
        amountExtra: number;
        detailExtra: string;
        type: import("../service/service.dto").ServiceType;
        total: number;
        createdAt: Date;
        updatedAt: Date;
        operator: import("../operators/operators.entity").Operator;
        user: import("../users/users.entity").User;
    }>;
}
