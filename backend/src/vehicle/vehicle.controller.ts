import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicle.dto';
import { Request, Response } from 'express';
import { Public } from 'src/auth/auth.decorator';
import { PdfService } from 'src/pdf/pdf.service';

@Controller('vehicle')
export class VehicleController {
  constructor(
    private vehicleService: VehicleService,
    private pdfService: PdfService,
  ) {}
  @Public()
  @Get('classVehicle')
  async getVehicleForClass() {
    return await this.vehicleService.getVehicleForClass();
  }
  @Get(':plate/plate')
  async getVehicleByPlate(@Param('plate') plate: string) {
    return await this.vehicleService.getVehicleByPlate(plate);
  }

  @Get(':id/operator')
  async getVehicles(@Param('id') id: number) {
    return await this.vehicleService.getVehicles(id);
  }
  @Get(':id')
  async getVehicle(@Param('id') id: number) {
    return await this.vehicleService.getVehicle(id);
  }
  @Post()
  async createVehicle(@Body() data: CreateVehicleDto, @Req() req: Request) {
    const userId = req['user'].sub;
    return await this.vehicleService.createVehicle(data, userId);
  }
  @Patch(':id')
  async updateVehicle(
    @Param('id') id: number,
    @Body() data: UpdateVehicleDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    return await this.vehicleService.updateVehicle(id, data, userId);
  }
  async deleteVehicle(@Param('id') id: number) {
    return await this.vehicleService.deleteVehicle(id);
  }
  @Public()
  @Get(':id/pdf')
  async generateCertificateOperator(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const vehicle = await this.vehicleService.getVehicle(id);
    if (!vehicle)
      throw new HttpException('Vehiculo no encontrado', HttpStatus.NOT_FOUND);
    const pdfName = `Certificado de operación ${vehicle.plate}`;
    const buffer = await this.pdfService.generateCertificateOperator(vehicle);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=' + pdfName + '.pdf',
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }
}
