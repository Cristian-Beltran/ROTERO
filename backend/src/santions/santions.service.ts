import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Santion } from './santions.entity';
import { Between, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { OperatorsService } from 'src/operators/operators.service';
import { PayordersService } from 'src/payorders/payorders.service';
import { TypeSantionsService } from 'src/type-santions/type-santions.service';
import { createSantionDto, updateSantionDto } from './santions.dto';
import { updatePayorderDto } from 'src/payorders/payorders.dto';

@Injectable()
export class SantionsService {
  constructor(
    @InjectRepository(Santion) private santionRepository: Repository<Santion>,
    private userService: UsersService,
    private operatorService: OperatorsService,
    private payorderService: PayordersService,
    private typeSantionService: TypeSantionsService,
  ) {}
  async getSantions(initDate: string, endDate: string): Promise<Santion[]> {
    const init = new Date(initDate);
    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59);
    const santions = await this.santionRepository.find({
      relations: [
        'user',
        'operator',
        'payorder',
        'typeSantion',
        'typeSantion.typePayorder',
      ],
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      where: {
        createdAt: Between(init, end),
      },
    });
    return santions;
  }
  async getSantion(id: number): Promise<Santion> {
    const santion = await this.santionRepository.findOne({
      relations: [
        'operator',
        'payorder',
        'typeSantion',
        'typeSantion.typePayorder',
      ],
      where: { id },
    });
    return santion;
  }
  async createSantion(
    data: createSantionDto,
    userId: number,
  ): Promise<Santion> {
    const user = await this.userService.getUser(userId);
    if (!user) throw new Error('Usuario no encontrado');

    const typeSantion = await this.typeSantionService.getTypeSantion(
      data.typeSantionId,
    );
    if (!typeSantion) throw new Error('Tipo de sancion no encontrado');
    const operator = await this.operatorService.getOperator(data.operatorId);
    if (!operator) throw new Error('Operador no encontrado');

    const payorderData = {
      typePayorderId: typeSantion.typePayorder.id,
      operatorId: data.operatorId,
      detail: data.detail,
    };

    const payorder = await this.payorderService.createPayorder(
      payorderData,
      userId,
    );

    return await this.santionRepository.save({
      user,
      operator,
      payorder,
      typeSantion: typeSantion,
      detail: data.detail,
    });
  }

  async updateSantion(
    id: number,
    data: updateSantionDto,
    userId: number,
  ): Promise<Santion> {
    const santion = await this.santionRepository.findOne({
      where: { id },
      relations: ['operator', 'payorder', 'typeSantion','typeSantion.typePayorder'],
    });

    if (santion.payorder.cancellation)
      throw new Error('La sancion ya fue cancelada');

    const user = await this.userService.getUser(userId);
    if (!user) throw new Error('Usuario no encontrado');

    const operator = await this.operatorService.getOperator(data.operatorId);
    if (!operator) throw new Error('Operador no encontrado');

    const typeSantion = await this.typeSantionService.getTypeSantion(
      data.typeSantionId,
    );
    const payorderData: updatePayorderDto = {
      operatorId: data.operatorId,
      typePayorderId: typeSantion.typePayorder.id,
      detail: data.detail,
    };

    await this.payorderService.updatePayorder(
      santion.payorder.id,
      payorderData,
      userId,
    );

    await this.santionRepository.update(id, {
      user,
      operator,
      typeSantion: typeSantion,
      detail: data.detail,
    });
    return await this.santionRepository.findOne({ where: { id } });
  }
  async deleteSantion(id: number): Promise<boolean> {
    const santion = await this.santionRepository.findOne({
      where: { id },
      relations: ['payorder'],
    });
    if (!santion) throw new Error('Sancion no encontrada');
    if (santion.payorder.cancellation)
      throw new Error('La sancion ya fue cancelada');
    await this.santionRepository.delete(id);
    await this.payorderService.deletePayorder(santion.payorder.id);
    return true;
  }
}
