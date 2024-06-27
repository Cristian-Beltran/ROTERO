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
import { ServiceService } from './service.service';
import { Request } from 'express';
import { ServiceType, createServiceDto, updateServiceDto } from './service.dto';
@Controller('service')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}
  @Get(':type/type')
  async getServices(@Param('type') type: ServiceType) {
    return await this.serviceService.getServices(type);
  }
  @Get(':id')
  async getService(@Param('id') id: number) {
    return await this.serviceService.getService(id);
  }
  @Post()
  async createService(@Body() data: createServiceDto, @Req() request: Request) {
    const userId = request['user'].sub;
    return await this.serviceService.createService(data, userId);
  }
  @Patch(':id')
  async updateService(
    @Param('id') id: number,
    @Body() data: updateServiceDto,
    @Req() request: Request,
  ) {
    const userId = request['user'].sub;
    return await this.serviceService.updateService(id, data, userId);
  }
  @Delete(':id')
  async deleteService(@Param('id') id: number) {
    return await this.serviceService.deleteService(id);
  }
}
