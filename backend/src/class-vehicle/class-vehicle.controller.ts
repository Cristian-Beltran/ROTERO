import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ClassVehicleService } from './class-vehicle.service';
import { CreateClassVehicleDto } from './class-vehicle.dto';
import { Request } from 'express';

@Controller('class-vehicle')
export class ClassVehicleController {
  constructor(private classVehicleService: ClassVehicleService) {}
  @Get()
  async getClassVehicles() {
    return await this.classVehicleService.getClassVehicles();
  }
  @Get(':id')
  async getClassVehicle(@Param('id') id: number) {
    return await this.classVehicleService.getClassVehicle(id);
  }
  @Post()
  async createClassVehicle(
    @Body() data: CreateClassVehicleDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    return await this.classVehicleService.createClassVehicle(data, userId);
  }
  @Patch(':id')
  async updateClassVehicle(
    @Param('id') id: number,
    @Body() data: CreateClassVehicleDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    return await this.classVehicleService.updateClassVehicle(id, data, userId);
  }
  @Delete(':id')
  async deleteClassVehicle(@Param('id') id: number) {
    return await this.classVehicleService.deleteClassVehicle(id);
  }
}
