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
import { OwnersService } from './owners.service';
import { createOwnerDto, updateOwnerDto } from './owners.dto';
import { Request } from 'express';

@Controller('owners')
export class OwnersController {
  constructor(private ownerService: OwnersService) {}
  @Get(':operatorId/operator')
  async getOwners(@Param('operatorId') operatorId: number) {
    return await this.ownerService.getOwners(operatorId);
  }
  @Get(':id')
  async getOwner(@Param('id') id: number) {
    return await this.ownerService.getOwner(id);
  }
  @Post()
  async createOwner(@Body() data: createOwnerDto, @Req() req: Request) {
    const userId = req['user'].sub;
    return await this.ownerService.createOwner(data, userId);
  }
  @Patch(':id')
  async updateOwner(
    @Param('id') id: number,
    @Body() data: updateOwnerDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    return await this.ownerService.updateOwner(id, data, userId);
  }
  @Delete(':id')
  async deleteOwner(@Param('id') id: number) {
    return await this.ownerService.deleteOwner(id);
  }
}
