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
import { DriversService } from './drivers.service';
import { createDriverDto, updateDriverDto } from './drivers.dto';
import { Request } from 'express';

@Controller('drivers')
export class DriversController {
  constructor(private driverService: DriversService) {}
  @Get(':id/operators')
  async getDrivers(@Param('id') id: number) {
    return await this.driverService.getDrivers(id);
  }
  @Get(':id')
  async getDriver(@Param('id') id: number) {
    return await this.driverService.getDriver(id);
  }
  @Post()
  async createDriver(@Body() data: createDriverDto, @Req() req: Request) {
    const userId = req['user'].sub;
    return await this.driverService.createDriver(data, userId);
  }
  @Patch(':id')
  async updateDriver(
    @Param('id') id: number,
    @Body() data: updateDriverDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    return await this.driverService.updateDriver(id, data, userId);
  }
  @Delete(':id')
  async deleteDriver(@Param('id') id: number) {
    return await this.driverService.deleteDriver(id);
  }
}
