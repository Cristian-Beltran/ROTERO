import { PayordersService } from './payorders.service';
import { createPayorderDto } from './payorders.dto';
import { Request, Response } from 'express';
import { PdfService } from 'src/pdf/pdf.service';
export declare class PayordersController {
    private payorderService;
    private pdfService;
    constructor(payorderService: PayordersService, pdfService: PdfService);
    getPayorders(initDate: string, endDate: string): Promise<import("./payorders.entity").Payorder[]>;
    createPayorder(data: createPayorderDto, req: Request): Promise<{
        operator: import("../operators/operators.entity").Operator;
        user: import("../users/users.entity").User;
        typePayorder: import("../type-payorders/type-payorders.entity").TypePayorder;
        detail: string;
    } & import("./payorders.entity").Payorder>;
    generateReportPayorders(res: Response, initDate: string, endDate: string): Promise<void>;
    updatePayorder(id: number, data: createPayorderDto, req: Request): Promise<import("typeorm").UpdateResult>;
    deletePayorder(id: number): Promise<any>;
    cancelPayorder(id: number): Promise<import("typeorm").UpdateResult>;
    generatePayorder(id: number, res: Response, req: Request): Promise<void>;
    getPayorder(id: number): Promise<import("./payorders.entity").Payorder>;
}
