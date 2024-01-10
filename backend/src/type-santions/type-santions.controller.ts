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
import { Request } from 'express';
import { TypeSantionsService } from './type-santions.service';
import {
  createTypeSantionDto,
  updateTypeSantionDto,
} from './type-santions.dto';

@Controller('type-santions')
export class TypeSantionsController {
  constructor(private typeSantionsService: TypeSantionsService) {}
  @Get()
  async getTypeSantions() {
    return await this.typeSantionsService.getTypeSantions();
  }
  @Get(':id')
  async getTypeSantion(@Param('id') id: number) {
    return await this.typeSantionsService.getTypeSantion(id);
  }
  @Post()
  async createTypeSantion(
    @Body() data: createTypeSantionDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    return await this.typeSantionsService.createTypeSantion(data, userId);
  }
  @Patch(':id')
  async updateTypeSantion(
    @Param('id') id: number,
    @Body() data: updateTypeSantionDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    return await this.typeSantionsService.updateTypeSantion(id, data, userId);
  }
  @Delete(':id')
  async deleteTypeSantion(@Param('id') id: number) {
    return await this.typeSantionsService.deleteTypeSantion(id);
  }
}
