import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { PayordersService } from './payorders.service';
import { createPayorderDto } from './payorders.dto';
import { Request, Response } from 'express';
import { PdfService } from 'src/pdf/pdf.service';
import { Public } from 'src/auth/auth.decorator'; 
@Controller('payorders')
export class PayordersController {
  constructor(
    private payorderService: PayordersService,
    private pdfService: PdfService,
  ) {}
  @Get()
  async getPayorders(
    @Query('initDate') initDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.payorderService.getPayorders(initDate, endDate);
  }

  @Post()
  async createPayorder(@Body() data: createPayorderDto, @Req() req: Request) {
    const userId = req['user'].sub;
    return await this.payorderService.createPayorder(data, userId);
  }
  @Get('report/pdf')
  async generateReportPayorders(
    @Res() res: Response,
    @Query('initDate') initDate: string,
    @Query('endDate') endDate: string,
  ) {
    const payorders = await this.payorderService.getPayorders(
      initDate,
      endDate,
    );
    const pdfName = `Reporte de Ordenes de Pago`;
    const buffer = await this.pdfService.generateReportPayorders(
      payorders,
      initDate,
      endDate,
    );
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=' + pdfName + '.pdf',
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }
  @Patch(':id')
  async updatePayorder(
    @Param('id') id: number,
    @Body() data: createPayorderDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    return await this.payorderService.updatePayorder(id, data, userId);
  }
  @Delete(':id')
  async deletePayorder(@Param('id') id: number) {
    return await this.payorderService.deletePayorder(id);
  }
  @Patch(':id/cancelation')
  async cancelPayorder(@Param('id') id: number) {
    return await this.payorderService.cancelPayorder(id);
  }
  @Public()
  @Get(':id/pdf')
  async generatePayorder(@Param('id') id: number, @Res() res: Response, @Req() req: Request) {
    const host = req.get('host');
    const payorder = await this.payorderService.getPayorder(id);
    const pdfName = `Orden de Pago ${payorder.id}`;
    const buffer = await this.pdfService.generatePayorder(payorder,host);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=' + pdfName + '.pdf',
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }
  @Get(':id')
  async getPayorder(@Param('id') id: number) {
    return await this.payorderService.getPayorder(id);
  }
}
