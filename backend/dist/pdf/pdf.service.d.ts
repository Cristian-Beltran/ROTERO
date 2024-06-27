/// <reference types="node" />
import { JwtService } from '@nestjs/jwt';
import { Vehicle } from 'src/vehicle/vehicle.entity';
export declare class PdfService {
    private jwtService;
    constructor(jwtService: JwtService);
    generatePayorder(payorder: any, url: any): Promise<Buffer>;
    generateReportPayorders(payorders: any, initDate: any, endDate: any): Promise<Buffer>;
    generateRossete(id: number): Promise<Buffer>;
    generateCertificateOperator(vehicle: Vehicle): Promise<Buffer>;
    private jumpLine;
    generateQRCode(data: string): Promise<Buffer>;
    private generateHeader;
    private generateFooter;
    private generateTitle;
    private generateHr;
    private generateOperatorInformation;
    private generateTotal;
    private generateToken;
}
