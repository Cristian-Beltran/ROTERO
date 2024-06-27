"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const common_1 = require("@nestjs/common");
const pdfkit_table_1 = require("pdfkit-table");
const path = require("path");
const QRCode = require("qrcode");
const jwt_1 = require("@nestjs/jwt");
let PdfService = class PdfService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async generatePayorder(payorder, url) {
        const pdfBuffer = await new Promise(async (resolve) => {
            const doc = new pdfkit_table_1.default({
                size: 'LETTER',
                bufferPages: true,
                margin: 50,
            });
            this.generateHeader(doc);
            this.generateTitle(doc, 'Orden de Pago');
            this.generateOperatorInformation(doc, payorder.operator);
            if (payorder.cancellation)
                doc
                    .fillColor('#DD2222')
                    .fontSize(10)
                    .text('Orden de pago cancelada | ' +
                    new Date(payorder.cancellationDate).toLocaleString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }), 50, 140)
                    .moveDown();
            const detailsRows = payorder.detailPayorders.map((detail) => [
                detail.name,
                detail.amount.toString(),
                detail.count.toString(),
                detail.total.toString(),
            ]);
            detailsRows.push([
                'Extra',
                payorder.amountExtra.toString(),
                '',
                payorder.amountExtra.toString(),
            ]);
            const totalExtra = payorder.amountExtra;
            const totalAmount = payorder.amount + totalExtra;
            detailsRows.push(['', '', 'Total', totalAmount.toString()]);
            const table = {
                headers: ['Detalle', 'Monto (Bs)', 'Cantidad', 'Total (Bs)'],
                rows: detailsRows,
            };
            await doc.table(table, {
                y: 279,
                x: 50,
            });
            const qrCodeBuffer = await this.generateQRCode(url + '/api/payorders/' + payorder.id + '/pdf');
            doc.image(qrCodeBuffer, 400, 80, { width: 100, align: 'center' });
            this.generateFooter(doc);
            doc.end();
            const buffer = [];
            doc.on('data', buffer.push.bind(buffer));
            doc.on('end', () => {
                const data = Buffer.concat(buffer);
                resolve(data);
            });
        });
        return pdfBuffer;
    }
    async generateReportPayorders(payorders, initDate, endDate) {
        const pdfBuffer = await new Promise(async (resolve) => {
            const doc = new pdfkit_table_1.default({
                size: 'LETTER',
                bufferPages: true,
                margin: 50,
            });
            this.generateHeader(doc);
            this.generateTitle(doc, 'Reporte de Ordenes de Pago');
            doc.moveDown();
            const table = {
                headers: [
                    'Detalle',
                    'Monto (Bs)',
                    'Extra',
                    'Extra (Bs)',
                    'Total (Bs)',
                    'Estado',
                ],
                rows: payorders.map((payorder) => [
                    payorder.detail.toString(),
                    payorder.total.toString(),
                    payorder.detailExtra.toString(),
                    payorder.amountExtra.toString(),
                    (payorder.total + payorder.amountExtra).toString(),
                    payorder.cancellation ? 'Pagado' : 'Pendiente',
                ]),
            };
            await doc.table(table, {
                y: 279,
                x: 50,
            });
            this.generateTotal(doc, payorders, initDate, endDate);
            this.generateFooter(doc);
            doc.end();
            const buffer = [];
            doc.on('data', buffer.push.bind(buffer));
            doc.on('end', () => {
                const data = Buffer.concat(buffer);
                resolve(data);
            });
        });
        return pdfBuffer;
    }
    async generateRossete(id) {
        const pdfBuffer = await new Promise(async (resolve) => {
            const doc = new pdfkit_table_1.default({
                size: [200, 245],
                bufferPages: true,
                margin: 50,
            });
            const logo = path.join(__dirname, '..', '..', 'static', 'logo.png');
            const bg = path.join(__dirname, '..', '..', 'static', 'bg.jpg');
            const firmOne = path.join(__dirname, '..', '..', 'static', 'firmOne.png');
            const firmTwo = path.join(__dirname, '..', '..', 'static', 'firmTwo.png');
            doc.image(bg, 0, 0, { width: 200, height: 245 });
            doc.fontSize(12).text('ROSETA DE OPERACIÓN', { align: 'center' });
            doc.image(logo, 50, 70, { width: 100, align: 'center' });
            const token = await this.generateToken(id);
            const qrCodeBuffer = await this.generateQRCode(token);
            doc.image(qrCodeBuffer, 50, 130, { width: 100, align: 'center' });
            doc.image(firmOne, 10, 10, { width: 100, align: 'center' });
            doc.image(firmTwo, 100, 10, { width: 100, align: 'center' });
            doc.end();
            const buffer = [];
            doc.on('data', buffer.push.bind(buffer));
            doc.on('end', () => {
                const data = Buffer.concat(buffer);
                resolve(data);
            });
        });
        return pdfBuffer;
    }
    async generateCertificateOperator(vehicle) {
        const pdfBuffer = await new Promise(async (resolve) => {
            const doc = new pdfkit_table_1.default({
                layout: 'landscape',
                size: 'A4',
                margin: 50,
            });
            const logo = path.join(__dirname, '..', '..', 'static', 'banner.png');
            doc.fontSize(10);
            const distanceMargin = 18;
            doc
                .fillAndStroke('#0e8cc3')
                .lineWidth(20)
                .lineJoin('round')
                .rect(distanceMargin, distanceMargin, doc.page.width - distanceMargin * 2, doc.page.height - distanceMargin * 2)
                .stroke();
            doc.image(logo, 30, 40, {
                fit: [780, 240],
            });
            this.jumpLine(doc, 10);
            const NotoSansJPLight = path.join(__dirname, '..', '..', 'static', 'NotoSansJP-Light.otf');
            doc
                .font(NotoSansJPLight)
                .fontSize(10)
                .fill('#021c27')
                .text('SINDICATO DE TRNASPORTE: ' + vehicle.operator.businessName, {
                align: 'center',
            });
            this.jumpLine(doc, 1);
            doc
                .font(NotoSansJPLight)
                .fontSize(10)
                .fill('#021c27')
                .text('R.A.: ' + vehicle.operator.dateRa, {
                align: 'center',
            });
            this.jumpLine(doc, 2);
            const NotoSansJPRegular = path.join(__dirname, '..', '..', 'static', 'NotoSansJP-Regular.otf');
            doc
                .font(NotoSansJPRegular)
                .fontSize(16)
                .fill('#021c27')
                .text('CERTIFICADO DE OPERACIÓN SERVICIO DE TRANSPORTE AUTOMOTO PÚBLICO TERRESTRE', {
                align: 'center',
            });
            this.jumpLine(doc, 1);
            doc
                .font(NotoSansJPLight)
                .fontSize(10)
                .fill('#021c27')
                .text('PROPIETARIO :' +
                vehicle.owner.firstName +
                ' ' +
                vehicle.owner.lastName, 140, 270, {
                align: 'left',
            });
            doc
                .font(NotoSansJPLight)
                .fontSize(10)
                .fill('#021c27')
                .text('MODELO     :' + vehicle.model, 140, 285, {
                align: 'left',
            });
            doc
                .font(NotoSansJPLight)
                .fontSize(10)
                .fill('#021c27')
                .text('MARCA      :' + vehicle.brand, 140, 300, {
                align: 'left',
            });
            doc
                .font(NotoSansJPLight)
                .fontSize(10)
                .fill('#021c27')
                .text('MARCA      :' + vehicle.modality, 140, 315, {
                align: 'left',
            });
            doc
                .font(NotoSansJPLight)
                .fontSize(10)
                .fill('#021c27')
                .text('RUTA AUTORIZADA :' + vehicle.operator.route, 140, 335, {
                align: 'left',
            });
            doc
                .font(NotoSansJPLight)
                .fontSize(10)
                .fill('#021c27')
                .text('Fecha de autorización:' +
                new Date(vehicle.operator.authorizationDate).toLocaleString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }), 140, 350, {
                align: 'left',
            });
            doc
                .font(NotoSansJPLight)
                .fontSize(10)
                .fill('#021c27')
                .text('CHASIS:' + vehicle.chassis, 440, 270, {
                align: 'left',
            });
            doc
                .font(NotoSansJPLight)
                .fontSize(10)
                .fill('#021c27')
                .text('CLASE:' + vehicle.classVehicle.name, 440, 285, {
                align: 'left',
            });
            doc
                .font(NotoSansJPLight)
                .fontSize(10)
                .fill('#021c27')
                .text('PLACA:' + vehicle.plate, 440, 300, {
                align: 'left',
            });
            doc
                .font(NotoSansJPLight)
                .fontSize(10)
                .fill('#021c27')
                .text('AL :' +
                new Date(vehicle.operator.validity).toLocaleString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }), 440, 350, {
                align: 'left',
            });
            this.jumpLine(doc, 7);
            doc.lineWidth(1);
            const lineSize = 174;
            const signatureHeight = 440;
            doc.fillAndStroke('#021c27');
            doc.strokeOpacity(0.2);
            const startLine1 = 128;
            const endLine1 = 128 + lineSize;
            doc
                .moveTo(startLine1, signatureHeight)
                .lineTo(endLine1, signatureHeight)
                .stroke();
            const startLine3 = endLine1 + 240;
            const endLine3 = startLine3 + lineSize;
            doc
                .moveTo(startLine3, signatureHeight)
                .lineTo(endLine3, signatureHeight)
                .stroke();
            const NotoSansJPBold = path.join(__dirname, '..', '..', 'static', 'NotoSansJP-Bold.otf');
            const firmOne = path.join(__dirname, '..', '..', 'static', 'firmOne.png');
            const firmTwo = path.join(__dirname, '..', '..', 'static', 'firmTwo.png');
            doc.image(firmOne, startLine1 + 20, signatureHeight - 50, {
                width: 150,
                align: 'center',
            });
            doc
                .font(NotoSansJPBold)
                .fontSize(10)
                .fill('#021c27')
                .text('Ing. Sergio Rodriguez Mercado', startLine1, signatureHeight + 10, {
                columns: 1,
                columnGap: 0,
                height: 40,
                width: lineSize,
                align: 'center',
            });
            doc
                .font(NotoSansJPLight)
                .fontSize(10)
                .fill('#021c27')
                .text('SECREATARIO DEPARTAMENTAL DE OBRAS Y SERVICIOS', startLine1, signatureHeight + 25, {
                columns: 1,
                columnGap: 0,
                height: 40,
                width: lineSize,
                align: 'center',
            });
            doc.image(firmTwo, startLine3 + 20, signatureHeight - 50, {
                width: 150,
                align: 'center',
            });
            doc
                .font(NotoSansJPBold)
                .fontSize(10)
                .fill('#021c27')
                .text('Dra. Carla Darinka Trujillo Daza', startLine3, signatureHeight + 10, {
                columns: 1,
                columnGap: 0,
                height: 40,
                width: lineSize,
                align: 'center',
            });
            doc
                .font(NotoSansJPLight)
                .fontSize(10)
                .fill('#021c27')
                .text('DIRECTORA TRANSPORTES Y TELECOMUNICACIONES', startLine3, signatureHeight + 25, {
                columns: 1,
                columnGap: 0,
                height: 40,
                width: lineSize,
                align: 'center',
            });
            this.jumpLine(doc, 4);
            const date = new Date();
            doc
                .font(NotoSansJPLight)
                .fontSize(10)
                .fill('#021c27')
                .text('Cochabamba, ' +
                date.toLocaleString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }), doc.page.width / 2 - 80, 490);
            doc.end();
            const buffer = [];
            doc.on('data', buffer.push.bind(buffer));
            doc.on('end', () => {
                const data = Buffer.concat(buffer);
                resolve(data);
            });
        });
        return pdfBuffer;
    }
    jumpLine(doc, lines) {
        for (let index = 0; index < lines; index++) {
            doc.moveDown();
        }
    }
    async generateQRCode(data) {
        try {
            const qrCodeBuffer = await QRCode.toBuffer(data);
            return qrCodeBuffer;
        }
        catch (error) {
            console.error('Error generando el código QR:', error);
            throw error;
        }
    }
    generateHeader(doc) {
        const logo = path.join(__dirname, '..', '..', 'static', 'logo.png');
        doc
            .image(logo, 50, 45, { width: 50 })
            .fillColor('#444444')
            .fontSize(10)
            .text('GOBIERNO AUTÓNOMO', 110, 57)
            .text('DEPARTAMENTAL DE COCHABAMABA.', 110, 67)
            .fontSize(6)
            .text('SECRETARIA DEPARTAMENTAL DE OBRAS PÚBLICAS Y SERVICIOS', 200, 65, {
            align: 'right',
        })
            .text('UNIDAD DE REGULACIÓN, CONTROL Y FISCALIZACIÓN DE TRANSPORTES', 200, 72, { align: 'right' })
            .moveDown();
    }
    generateFooter(doc) {
        const date = new Date();
        const footer = `Documento generado el: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        doc.fontSize(6).text(footer, 50, doc.page.height - 50, {
            lineBreak: false,
        });
    }
    generateTitle(doc, title) {
        doc.fillColor('#444444').fontSize(20).text(title, 50, 160);
    }
    generateHr(doc, y) {
        doc
            .strokeColor('#aaaaaa')
            .lineWidth(1)
            .moveTo(50, y)
            .lineTo(550, y)
            .stroke();
    }
    generateOperatorInformation(doc, operator) {
        this.generateHr(doc, 185);
        const customerInformationTop = 200;
        doc
            .fontSize(10)
            .text('Razon Social:', 50, customerInformationTop)
            .font('Helvetica-Bold')
            .text(operator.businessName, 150, customerInformationTop)
            .font('Helvetica')
            .text('Representante Legal:', 50, customerInformationTop + 15)
            .text(operator.legalRepresentative, 150, customerInformationTop + 15)
            .text('Seprec:', 50, customerInformationTop + 30)
            .text(operator.seprec, 150, customerInformationTop + 30)
            .text('NIT:', 50, customerInformationTop + 45)
            .text(operator.nit, 150, customerInformationTop + 45)
            .font('Helvetica-Bold')
            .text('Numero tecnico: ' + operator.tecnicalNumber, 300, customerInformationTop)
            .font('Helvetica')
            .text('Numero legal: ' + operator.legalNumber, 300, customerInformationTop + 15)
            .moveDown();
        this.generateHr(doc, 267);
    }
    generateTotal(doc, payorders, initDate, endDate) {
        const totalPendientes = payorders.reduce((acc, payorder) => {
            if (!payorder.cancellation)
                return acc + payorder.total + payorder.amountExtra;
            else
                return acc;
        }, 0);
        const totalPagados = payorders.reduce((acc, payorder) => {
            if (payorder.cancellation)
                return acc + payorder.total + payorder.amountExtra;
            else
                return acc;
        }, 0);
        doc
            .fontSize(10)
            .text('Recibido.', 50, 200, {
            align: 'left',
            width: 500,
        })
            .text('Bs. ' + totalPagados, 100, 200, {
            align: 'left',
            width: 500,
        })
            .text('Pendiente.', 50, 215, {
            align: 'left',
            width: 500,
        })
            .text('Bs. ' + totalPendientes, 100, 215, {
            align: 'left',
            width: 500,
        })
            .text('Fecha inicio:', 250, 200, {
            align: 'left',
            width: 500,
        })
            .text(initDate, 330, 200, {
            align: 'left',
        })
            .text('Fecha final:', 250, 215, {
            align: 'left',
            width: 500,
        })
            .text(endDate, 330, 215, {
            align: 'left',
        });
    }
    async generateToken(id) {
        const payload = {
            id: id,
        };
        return await this.jwtService.signAsync(payload);
    }
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], PdfService);
//# sourceMappingURL=pdf.service.js.map