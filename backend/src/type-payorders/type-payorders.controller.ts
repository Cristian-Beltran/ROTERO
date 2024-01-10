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
import { TypePayordersService } from './type-payorders.service';
import { CreateTypePayorderDto } from './type-payorders.dto';
import { Request } from 'express';

@Controller('type-payorders')
export class TypePayordersController {
  constructor(private readonly typePayordersService: TypePayordersService) {}
  @Get()
  getTypePayorders() {
    return this.typePayordersService.getTypePayorders();
  }
  @Get(':id')
  getTypePayorder(@Param('id') id: number) {
    return this.typePayordersService.getTypePayorder(id);
  }
  @Post()
  createTypePayorder(@Body() data: CreateTypePayorderDto, @Req() req: Request) {
    const userId = req['user'].sub;
    return this.typePayordersService.createTypePayorder(userId, data);
  }
  @Patch(':id')
  updateTypePayorder(
    @Body() data: CreateTypePayorderDto,
    @Req() req: Request,
    @Param('id') id: number,
  ) {
    const userId = req['user'].sub;
    return this.typePayordersService.updateTypePayorder(id, data, userId);
  }
  @Delete(':id')
  deleteTypePayorder(@Param('id') id: number) {
    return this.typePayordersService.deleteTypePayorder(id);
  }
}
