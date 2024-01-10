import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypePayorder } from './type-payorders.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateTypePayorderDto } from './type-payorders.dto';

@Injectable()
export class TypePayordersService {
  constructor(
    @InjectRepository(TypePayorder)
    private typePayorderRepository: Repository<TypePayorder>,
    private userService: UsersService,
  ) {}

  async getTypePayorders(): Promise<TypePayorder[]> {
    const typePayorders = await this.typePayorderRepository.find({
      relations: ['user']
    });
    return typePayorders;
  }
  async getTypePayorder(id: number): Promise<TypePayorder> {
    const typePayorder = await this.typePayorderRepository.findOne({
      where: { id },
    });
    return typePayorder;
  }
  async createTypePayorder(
    userId: number,
    data: CreateTypePayorderDto,
  ): Promise<TypePayorder> {
    const user = await this.userService.getUser(userId);
    if (!user)
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    const typePayorderData = {
      ...data,
      user,
    };
    return await this.typePayorderRepository.save(typePayorderData);
  }
  async updateTypePayorder(
    id: number,
    data: CreateTypePayorderDto,
    userId: number,
  ): Promise<TypePayorder> {
    const typePayorder = await this.typePayorderRepository.findOne({
      where: { id },
    });
    if (!typePayorder)
      throw new HttpException(
        'Tipo de pago no encontrado',
        HttpStatus.NOT_FOUND,
      );
    const user = await this.userService.getUser(userId);
    if (!user)
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    const typePayorderData = {
      ...data,
      user,
    };
    await this.typePayorderRepository.update(id, typePayorderData);
    return await this.typePayorderRepository.findOne({ where: { id } });
  }
  async deleteTypePayorder(id: number): Promise<boolean> {
    try {
      await this.typePayorderRepository.delete(id);
      return true;
    } catch (error) {
      throw new HttpException(
        'Error al eliminar el tipo de pago',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
