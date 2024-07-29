import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit-table';
import { Operator } from 'src/operators/operators.entity';
import * as path from 'path';
import * as QRCode from 'qrcode';
import { JwtService } from '@nestjs/jwt';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import { Payorder } from 'src/payorders/payorders.entity';
import { Rossete } from 'src/rossetes/rossetes.entity';
@Injectable()
export class PdfService {
  constructor(private jwtService: JwtService) {}
  async generatePayorder(payorder: any, url): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise(async (resolve) => {
      const doc = new PDFDocument({
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
          .text(
            'Orden de pago cancelada | ' +
              new Date(payorder.cancellationDate).toLocaleString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
            50,
            140,
          )
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
      const qrCodeBuffer = await this.generateQRCode(
        url + '/api/payorders/' + payorder.id + '/pdf',
      );
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
    const pdfBuffer: Buffer = await new Promise(async (resolve) => {
      const doc = new PDFDocument({
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
  async generateRossete(id: number, url: string) {
    const pdfBuffer: Buffer = await new Promise(async (resolve) => {
      const doc = new PDFDocument({
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
      const qrCodeBuffer = await this.generateQRCode(
        url + '/api/rossete/' + id + '/info',
      );
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
  async generateRosseteInfo(rossete: Rossete) {
    const pdfBuffer: Buffer = await new Promise(async (resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
        margin: 50,
      });
      this.generateHeader(doc);
      this.generateTitle(doc, 'Información de Roseta');
      this.generateRosseteInformation(doc, rossete);
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

  async generateCertificateOperator(vehicle: Vehicle) {
    const pdfBuffer: Buffer = await new Promise(async (resolve) => {
      const doc = new PDFDocument({
        layout: 'landscape',
        size: 'A4',
        margin: 50,
      });
      const logo = path.join(__dirname, '..', '..', 'static', 'banner.png');
      //const bg = path.join(__dirname, '..', '..', 'static', 'bg.jpg');

      doc.fontSize(10);

      // Margin
      const distanceMargin = 18;

      doc
        .fillAndStroke('#0e8cc3')
        .lineWidth(20)
        .lineJoin('round')
        .rect(
          distanceMargin,
          distanceMargin,
          doc.page.width - distanceMargin * 2,
          doc.page.height - distanceMargin * 2,
        )
        .stroke();

      doc.image(logo, 30, 40, {
        fit: [780, 240],
      });

      this.jumpLine(doc, 10);
      const NotoSansJPLight = path.join(
        __dirname,
        '..',
        '..',
        'static',
        'NotoSansJP-Light.otf',
      );
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

      // Content
      const NotoSansJPRegular = path.join(
        __dirname,
        '..',
        '..',
        'static',
        'NotoSansJP-Regular.otf',
      );
      doc
        .font(NotoSansJPRegular)
        .fontSize(16)
        .fill('#021c27')
        .text(
          'CERTIFICADO DE OPERACIÓN SERVICIO DE TRANSPORTE AUTOMOTO PÚBLICO TERRESTRE',
          {
            align: 'center',
          },
        );

      this.jumpLine(doc, 1);

      doc
        .font(NotoSansJPLight)
        .fontSize(10)
        .fill('#021c27')
        .text(
          'PROPIETARIO :' +
            vehicle.owner.firstName +
            ' ' +
            vehicle.owner.lastName,
          140,
          270,
          {
            align: 'left',
          },
        );
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
        .text(
          'Fecha de autorización:' +
            new Date(vehicle.operator.authorizationDate).toLocaleString(
              'es-ES',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              },
            ),
          140,
          350,
          {
            align: 'left',
          },
        );
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
        .text('CLASE:' + vehicle.classVehicle, 440, 285, {
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
        .text(
          'AL :' +
            new Date(vehicle.operator.validity).toLocaleString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          440,
          350,
          {
            align: 'left',
          },
        );

      this.jumpLine(doc, 7);

      doc.lineWidth(1);
      // Signatures
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

      const NotoSansJPBold = path.join(
        __dirname,
        '..',
        '..',
        'static',
        'NotoSansJP-Bold.otf',
      );

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
        .text(
          'Ing. Sergio Rodriguez Mercado',
          startLine1,
          signatureHeight + 10,
          {
            columns: 1,
            columnGap: 0,
            height: 40,
            width: lineSize,
            align: 'center',
          },
        );

      doc
        .font(NotoSansJPLight)
        .fontSize(10)
        .fill('#021c27')
        .text(
          'SECREATARIO DEPARTAMENTAL DE OBRAS Y SERVICIOS',
          startLine1,
          signatureHeight + 25,
          {
            columns: 1,
            columnGap: 0,
            height: 40,
            width: lineSize,
            align: 'center',
          },
        );

      doc.image(firmTwo, startLine3 + 20, signatureHeight - 50, {
        width: 150,
        align: 'center',
      });
      doc
        .font(NotoSansJPBold)
        .fontSize(10)
        .fill('#021c27')
        .text(
          'Dra. Carla Darinka Trujillo Daza',
          startLine3,
          signatureHeight + 10,
          {
            columns: 1,
            columnGap: 0,
            height: 40,
            width: lineSize,
            align: 'center',
          },
        );

      doc
        .font(NotoSansJPLight)
        .fontSize(10)
        .fill('#021c27')
        .text(
          'DIRECTORA TRANSPORTES Y TELECOMUNICACIONES',
          startLine3,
          signatureHeight + 25,
          {
            columns: 1,
            columnGap: 0,
            height: 40,
            width: lineSize,
            align: 'center',
          },
        );

      this.jumpLine(doc, 4);

      // Validation link

      const date = new Date();

      doc
        .font(NotoSansJPLight)
        .fontSize(10)
        .fill('#021c27')
        .text(
          'Cochabamba, ' +
            date.toLocaleString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          doc.page.width / 2 - 80,
          490,
        );

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
  private jumpLine(doc, lines: number) {
    for (let index = 0; index < lines; index++) {
      doc.moveDown();
    }
  }

  async generateQRCode(data: string): Promise<Buffer> {
    try {
      const qrCodeBuffer = await QRCode.toBuffer(data);
      return qrCodeBuffer;
    } catch (error) {
      console.error('Error generando el código QR:', error);
      throw error;
    }
  }

  private generateHeader(doc: any) {
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
      .text(
        'UNIDAD DE REGULACIÓN, CONTROL Y FISCALIZACIÓN DE TRANSPORTES',
        200,
        72,
        { align: 'right' },
      )
      .moveDown();
  }
  private generateFooter(doc: any) {
    const date = new Date();
    const footer = `Documento generado el: ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    doc.fontSize(6).text(footer, 50, doc.page.height - 50, {
      lineBreak: false,
    });
  }
  private generateTitle(doc: any, title: string) {
    doc.fillColor('#444444').fontSize(20).text(title, 50, 160);
  }

  private generateHr(doc: any, y: number) {
    doc
      .strokeColor('#aaaaaa')
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
  }

  private generateRosseteInformation(doc: any, rossete: Rossete) {
    this.generateHr(doc, 185);
    const customerInformationTop = 200;

    doc
      .fontSize(10)
      .text('Razón Social:', 50, customerInformationTop)
      .font('Helvetica-Bold')
      .text(rossete.vehicle.operator.businessName, 150, customerInformationTop)
      .font('Helvetica')
      .text('Representante Legal:', 50, customerInformationTop + 15)
      .text(
        rossete.vehicle.operator.legalRepresentative,
        150,
        customerInformationTop + 15,
      )
      .text('Propietario:', 50, customerInformationTop + 30)
      .text(rossete.vehicle.operator.owner, 150, customerInformationTop + 30)
      .text('NIT:', 50, customerInformationTop + 45)
      .text(rossete.vehicle.operator.nit, 150, customerInformationTop + 45)
      .text('Estado:', 50, customerInformationTop + 60)
      .text(rossete.vehicle.operator.state, 150, customerInformationTop + 60)
      .text('Entidad Matriz:', 50, customerInformationTop + 75)
      .text(rossete.vehicle.operator.entityMatris, 150, customerInformationTop + 75)
      .text('Ruta:', 50, customerInformationTop + 90)
      .text(rossete.vehicle.operator.route, 150, customerInformationTop + 90)
      .text('Observaciones:', 50, customerInformationTop + 105)
      .text(rossete.vehicle.operator.observations, 150, customerInformationTop + 105)
      .font('Helvetica-Bold')
      .moveDown();

    this.generateHr(doc, 270);

    doc
      .fontSize(10)
      .text('Tipo de Servicio:', 50, customerInformationTop + 120)
      .text(rossete.vehicle.typeService, 150, customerInformationTop + 120)
      .text('Modalidad:', 50, customerInformationTop + 135)
      .text(rossete.vehicle.modality, 150, customerInformationTop + 135)
      .text('Carga Máxima:', 50, customerInformationTop + 150)
      .text(rossete.vehicle.maxLoad + ' kg', 150, customerInformationTop + 150)
      .text('Pasajeros Máximos:', 50, customerInformationTop + 165)
      .text(rossete.vehicle.maxPass, 150, customerInformationTop + 165)
      .text('Tipo de Vehículo:', 50, customerInformationTop + 180)
      .text(rossete.vehicle.typeVehicle, 150, customerInformationTop + 180)
      .text('Modelo:', 50, customerInformationTop + 195)
      .text(rossete.vehicle.model, 150, customerInformationTop + 195)
      .text('Marca:', 50, customerInformationTop + 210)
      .text(rossete.vehicle.brand, 150, customerInformationTop + 210)
      .text('Motor:', 50, customerInformationTop + 225)
      .text(rossete.vehicle.motor, 150, customerInformationTop + 225)
      .text('Chasis:', 50, customerInformationTop + 240)
      .text(rossete.vehicle.chassis, 150, customerInformationTop + 240)
      .text('SOAT:', 50, customerInformationTop + 255)
      .text(rossete.vehicle.soat ? 'Sí' : 'No', 150, customerInformationTop + 255)
      .text('Inspección:', 50, customerInformationTop + 270)
      .text(rossete.vehicle.inspection ? 'Sí' : 'No', 150, customerInformationTop + 270)
      .text('Placa:', 50, customerInformationTop + 285)
      .text(rossete.vehicle.plate, 150, customerInformationTop + 285)
      .text('Clase de Vehículo:', 50, customerInformationTop + 300)
      .text(rossete.vehicle.classVehicle, 150, customerInformationTop + 300)
      .moveDown();

    this.generateHr(doc, 375);

    doc
      .fontSize(10)
      .text('Propietario:', 50, customerInformationTop + 315)
      .font('Helvetica-Bold')
      .text(
        rossete.vehicle.owner.firstName + ' ' + rossete.vehicle.owner.lastName,
        150,
        customerInformationTop + 315,
      )
      .font('Helvetica')
      .text('CI:', 50, customerInformationTop + 330)
      .text(rossete.vehicle.owner.ci, 150, customerInformationTop + 330)
      .moveDown();
  }
  private generateOperatorInformation(doc: any, operator: Operator) {
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
      .text(
        'Numero tecnico: ' + operator.tecnicalNumber,
        300,
        customerInformationTop + 30,
      )
      .font('Helvetica')
      .text(
        'Numero legal: ' + operator.legalNumber,
        300,
        customerInformationTop + 45,
      )
      .moveDown();
    this.generateHr(doc, 267);
  }
  private generateTotal(
    doc: any,
    payorders: Payorder[],
    initDate: string,
    endDate: string,
  ) {
    const totalPendientes = payorders.reduce((acc, payorder) => {
      if (!payorder.cancellation)
        return acc + payorder.total + payorder.amountExtra;
      else return acc;
    }, 0);
    const totalPagados = payorders.reduce((acc, payorder) => {
      if (payorder.cancellation)
        return acc + payorder.total + payorder.amountExtra;
      else return acc;
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
      //date
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
  private async generateToken(id: number): Promise<string> {
    const payload = {
      id: id,
    };
    return await this.jwtService.signAsync(payload);
  }
}
