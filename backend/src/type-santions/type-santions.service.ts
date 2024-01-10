import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { TypeSantion } from './type-santions.entity';
import { Repository } from 'typeorm';
import {
  createTypeSantionDto,
  updateTypeSantionDto,
} from './type-santions.dto';
import { TypePayordersService } from 'src/type-payorders/type-payorders.service';

@Injectable()
export class TypeSantionsService {
  constructor(
    @InjectRepository(TypeSantion)
    private typeSantionRepository: Repository<TypeSantion>,
    private userService: UsersService,
    private typePayorderService: TypePayordersService,
  ) {}
  async getTypeSantions(): Promise<TypeSantion[]> {
    const typeSantions = await this.typeSantionRepository.find({
      relations: ['user', 'typePayorder'],
    });
    return typeSantions;
  }
  async getTypeSantion(id: number): Promise<TypeSantion> {
    const typeSantion = await this.typeSantionRepository.findOne({
      where: { id },
      relations: ['user', 'typePayorder'],
    });
    return typeSantion;
  }
  async createTypeSantion(
    data: createTypeSantionDto,
    userId: number,
  ): Promise<TypeSantion> {
    const user = await this.userService.getUser(userId);
    if (!user)
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    const typePayorder = await this.typePayorderService.createTypePayorder(
      userId,
      {
        name: data.name,
        detail: data.detail,
        amount: data.amount,
      },
    );
    if (!typePayorder) throw new Error('No se pudo crear el tipo de pago');
    const typeSantionData = {
      severity: data.severity,
      user,
      typePayorder,
    };
    return await this.typeSantionRepository.save(typeSantionData);
  }
  async updateTypeSantion(
    id: number,
    data: updateTypeSantionDto,
    userId: number,
  ): Promise<TypeSantion> {
    const typeSantion = await this.typeSantionRepository.findOne({
      where: { id },
      relations: ['typePayorder']
    });
    if (!typeSantion) throw new Error('Sancion no encontrada');
    const user = await this.userService.getUser(userId);
    if (!user) throw new Error('Usuario no encontrado');
    const typePayoder = await this.typePayorderService.updateTypePayorder(
      typeSantion.typePayorder.id,
      {
        name: data.name,
        detail: data.detail,
        amount: data.amount,
      },
      userId,
    );
    if (!typePayoder) throw new Error('No se pudo actualizar el tipo de pago');
    const typeSantionData = {
      severity: data.severity,
      user,
    };
    await this.typeSantionRepository.update(id, typeSantionData);
    return await this.typeSantionRepository.findOne({ where: { id } });
  }

  async deleteTypeSantion(id: number): Promise<boolean> {
    try {
      const typeSantion = await this.getTypeSantion(id);
      if (!typeSantion) throw new Error('Sancion no encontrada');
      await this.typeSantionRepository.delete(id);
      await this.typePayorderService.deleteTypePayorder(
        typeSantion.typePayorder.id,
      );
      return true;
    } catch (error) {
      throw new Error('No se pudo eliminar la sancion');
    }
  }
}
