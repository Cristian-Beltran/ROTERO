import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './roles.entity';
import { createRoleDto, updateRoleDto } from './roles.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleService: Repository<Role>,
    private userService: UsersService,
  ) {}
  async getRoles(): Promise<Role[]> {
    const roles = await this.roleService.find({
      relations: ['user'],
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      where: { isActive: true },
    });
    return roles;
  }
  async getRole(id: number): Promise<Role> {
    const role = await this.roleService.findOne({
      where: { id },
    });
    return role;
  }
  async createRole(data: createRoleDto, userId: number) {
    const role = await this.roleService.findOne({
      where: { name: data.name },
    });
    const user = await this.userService.getUserFilter({ id: userId });
    if (role) {
      throw new HttpException('El rol ya existe', HttpStatus.CONFLICT);
    }
    const newRole = {
      ...data,
      user,
      isActive: true,
    };
    return await this.roleService.save(newRole);
  }
  async updateRole(id: number, data: updateRoleDto, userId: number) {
    const role = await this.roleService.findOne({ where: { id } });
    if (!role) {
      throw new HttpException('El rol no existe', HttpStatus.NOT_FOUND);
    }
    const user = await this.userService.getUserFilter({ id: userId });
    const updateRole = {
      ...data,
      user,
    };
    return await this.roleService.update(id, updateRole);
  }
  async deleteRole(id: number) {
    const role = await this.roleService.findOne({ where: { id } });
    if (!role) {
      throw new HttpException('El rol no existe', HttpStatus.NOT_FOUND);
    }
    return await this.roleService.update(id, { isActive: false });
  }
}
