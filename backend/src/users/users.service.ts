import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { PermissionLevel } from './users.entity';
import { CreateUserDto, FilterUserDto, UpdateUserDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/roles.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}
  async getUserFilter(filter: FilterUserDto): Promise<User> {
    if (!filter.ci && !filter.birthday && !filter.email && !filter.id) {
      throw new HttpException(
        'No se ha enviado ningun parametro',
        HttpStatus.NOT_FOUND,
      );
    }
    const user = await this.userRepository.findOne({
      where: { isActive: true, ...filter },
      relations: ['role'],
    });
    return user;
  }
  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    return user;
  }
  async getUsers(permissionLevel: PermissionLevel): Promise<User[]> {
    const users = await this.userRepository.find({
      where: { permissionLevel },
      relations: ['role'],
    });
    return users;
  }
  async createUser(permissionLevel: PermissionLevel, data: CreateUserDto) {
    if (permissionLevel === PermissionLevel.CONSULTOR) {
      const role = await this.roleRepository.findOne({
        where: { id: data.roleId },
      });
      data.role = role;
    }
    if (permissionLevel != PermissionLevel.OPERADOR) {
      const passwordHash = await bcrypt.hash(data.ci, 10);
      data.password = passwordHash;
    }
    const user = await this.userRepository.findOne({
      where: { ci: data.ci },
    });
    if (user) {
      throw new HttpException('El ci ya esta ingresado', HttpStatus.NOT_FOUND);
    }
    const newUser = this.userRepository.create({
      ...data,
      permissionLevel,
    });
    return await this.userRepository.save(newUser);
  }
  async updateUser(id: number, data: UpdateUserDto) {
    console.log('buscando usuario');
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    console.log(user);
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    if (data.roleId && user.permissionLevel === PermissionLevel.CONSULTOR) {
      const role = await this.roleRepository.findOne({
        where: { id: data.roleId },
      });
      data.role = role;
      delete data.roleId;
    }
    return await this.userRepository.update(id, data);
  }
  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    return await this.userRepository.update(id, { isActive: false });
  }
}
