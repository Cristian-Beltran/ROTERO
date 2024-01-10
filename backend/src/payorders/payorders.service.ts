import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository, Between } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Payorder } from './payorders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createPayorderDto, updatePayorderDto } from './payorders.dto';
import { OperatorsService } from 'src/operators/operators.service';
import { TypePayordersService } from 'src/type-payorders/type-payorders.service';

@Injectable()
export class PayordersService {
  constructor(
    @InjectRepository(Payorder)
    private payorderRepository: Repository<Payorder>,
    private userService: UsersService,
    private operatorService: OperatorsService,
    private typePayoderService: TypePayordersService,
  ) {}
  async getPayorders(initDate: string, endDate: string): Promise<Payorder[]> {
    const init = new Date(initDate);
    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59);
    const payorders = await this.payorderRepository.find({
      where: {
        createdAt: Between(init, end),
      },
      relations: ['user', 'operator', 'typePayorder'],
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    });
    return payorders;
  }
  async getPayorder(id: number): Promise<Payorder> {
    const payorder = await this.payorderRepository.findOne({
      relations: ['operator', 'typePayorder'],
      where: { id },
    });
    return payorder;
  }

  async createPayorder(data: createPayorderDto, userId: number) {
    const user = await this.userService.getUserFilter({ id: userId });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    const typePayorder = await this.typePayoderService.getTypePayorder(
      data.typePayorderId,
    );
    if (!typePayorder) {
      throw new HttpException(
        'El tipo de pago no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    const operator = await this.operatorService.getOperator(data.operatorId);
    const newPayorder = {
      operator,
      user,
      typePayorder,
      detail: data.detail,
    };
    return await this.payorderRepository.save(newPayorder);
  }
  async updatePayorder(id: number, data: updatePayorderDto, userId: number) {
    const payorder = await this.payorderRepository.findOne({ where: { id } });
    if (!payorder) {
      throw new HttpException(
        'La orden de pago no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    if (payorder.cancellation) {
      throw new HttpException(
        'La orden de pago ya fue cancelada',
        HttpStatus.BAD_REQUEST,
      );
    }
    const typePayorder = await this.typePayoderService.getTypePayorder(
      data.typePayorderId,
    );
    if (!typePayorder) {
      throw new HttpException(
        'El tipo de pago no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    const user = await this.userService.getUserFilter({ id: userId });
    const operator = await this.operatorService.getOperator(data.operatorId);
    const updatePayorder = {
      detail: data.detail,
      user,
      operator,
      typePayorder,
    };
    return await this.payorderRepository.update(id, updatePayorder);
  }
  async deletePayorder(id: number) {
    try {
      const payorder = await this.payorderRepository.findOne({ where: { id } });
      if (!payorder) {
        throw new HttpException(
          'La orden de pago no existe',
          HttpStatus.NOT_FOUND,
        );
      }
      if (payorder.cancellation) {
        throw new HttpException(
          'La orden de pago ya fue cancelada',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.payorderRepository.delete(id);
    } catch (error) {
      return error;
    }
  }

  async cancelPayorder(id: number) {
    const payorder = await this.payorderRepository.findOne({ where: { id } });
    if (!payorder) {
      throw new HttpException(
        'La orden de pago no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    if (payorder.cancellation) {
      throw new HttpException(
        'La orden de pago ya fue cancelada',
        HttpStatus.BAD_REQUEST,
      );
    }
    const date = new Date();
    return await this.payorderRepository.update(id, {
      cancellation: true,
      cancellationDate: date,
    });
  }
}
