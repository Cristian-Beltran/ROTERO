import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Query,
} from '@nestjs/common';
import { SantionsService } from './santions.service';
import { createSantionDto } from './santions.dto';
import { Request } from 'express';

@Controller('santions')
export class SantionsController {
  constructor(private santionsService: SantionsService) {}
  @Get()
  async getSantions(
    @Query('initDate') initDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.santionsService.getSantions(initDate, endDate);
  }
  @Get(':id')
  async getSantion(@Param('id') id: number) {
    return await this.santionsService.getSantion(id);
  }
  @Post()
  async createSantion(@Body() data: createSantionDto, @Req() req: Request) {
    const userId = req['user'].sub;
    return await this.santionsService.createSantion(data, userId);
  }
  @Patch(':id')
  async updateSantion(
    @Param('id') id: number,
    @Body() data: createSantionDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    return await this.santionsService.updateSantion(id, data, userId);
  }
  @Delete(':id')
  async deleteSantion(@Param('id') id: number) {
    return await this.santionsService.deleteSantion(id);
  }
}
