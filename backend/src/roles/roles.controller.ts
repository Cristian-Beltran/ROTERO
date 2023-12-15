import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { createRoleDto, updateRoleDto } from './roles.dto';
import { Request } from 'express';
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}
  @Get()
  async getRoles() {
    return this.roleService.getRoles();
  }
  @Get(':id')
  async getRole(@Param('id') id: number) {
    return this.roleService.getRole(id);
  }
  @Post()
  async createRole(@Body() data: createRoleDto, @Req() request: Request) {
    const userId = request['user'].sub;
    return this.roleService.createRole(data, userId);
  }
  @Patch(':id')
  async updateRole(
    @Param('id') id: number,
    @Body() data: updateRoleDto,
    @Req() request: Request,
  ) {
    const userId = request['user'].sub;
    return this.roleService.updateRole(id, data, userId);
  }
  @Delete(':id')
  async deleteRole(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }
}
