import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PermissionLevel } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  async createUser(
    @Body() data: CreateUserDto,
    @Query() params: { permissionLevel: PermissionLevel },
  ) {
    return await this.userService.createUser(params.permissionLevel, data);
  }
  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return await this.userService.updateUser(id, data);
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }
  @Get()
  async getUsers(@Query() params: { permissionLevel: PermissionLevel }) {
    return await this.userService.getUsers(params.permissionLevel);
  }
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.userService.getUser(id);
  }
}
