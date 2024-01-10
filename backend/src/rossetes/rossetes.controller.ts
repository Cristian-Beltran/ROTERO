import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Param,
  Res,
} from '@nestjs/common';
import { RossetesService } from './rossetes.service';
import { CreateRosseteDto, UpdateRosseteDto } from './rossetes.dto';
import { Request, Response } from 'express';
import { PdfService } from 'src/pdf/pdf.service';

@Controller('rossetes')
export class RossetesController {
  constructor(
    private rosseteService: RossetesService,
    private pdfService: PdfService,
  ) {}
  @Get()
  async getRossetes() {
    return await this.rosseteService.getRossetes();
  }
  @Get(':token/qr')
  async readQrRossete(@Param('token') token: string, @Req() req: Request) {
    const userId = req['user'].sub;
    return await this.rosseteService.readQrRossete(token, userId);
  }
  @Get(':id')
  async getRossete(@Param('id') id: number) {
    return await this.rosseteService.getRossete(id);
  }
  @Post()
  async createRossete(@Body() data: CreateRosseteDto, @Req() req: Request) {
    const userId = req['user'].sub;
    return await this.rosseteService.createRossete(data, userId);
  }
  @Patch(':id')
  async updateRossete(
    @Body() data: UpdateRosseteDto,
    @Req() req: Request,
    @Param('id') id: number,
  ) {
    const userId = req['user'].sub;
    return await this.rosseteService.updateRossete(id, data, userId);
  }
  @Delete(':id')
  async deleteRossete(@Param('id') id: number) {
    return await this.rosseteService.deleteRossete(id);
  }
  @Get(':id/pdf')
  async generateRossete(@Param('id') id: number, @Res() res: Response) {
    const rossete = await this.rosseteService.getRossete(id);
    const pdfName = `Roseta ${rossete.id}`;
    const buffer = await this.pdfService.generateRossete(id);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=' + pdfName + '.pdf',
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }
}
