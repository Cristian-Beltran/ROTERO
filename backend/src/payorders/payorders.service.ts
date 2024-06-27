import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository, Between } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Payorder } from './payorders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createPayorderDto, updatePayorderDto } from './payorders.dto';
import { OperatorsService } from 'src/operators/operators.service';
import { DetailPayorder } from './detail_payorder.entity';
import { ServiceService } from 'src/service/service.service';

@Injectable()
export class PayordersService {
  constructor(
    @InjectRepository(Payorder)
    private payorderRepository: Repository<Payorder>,
    @InjectRepository(DetailPayorder)
    private detailPayorderRepository: Repository<DetailPayorder>,
    private userService: UsersService,
    private operatorService: OperatorsService,
    private serviceService: ServiceService,
  ) {}
  async getPayorders(initDate: string, endDate: string): Promise<Payorder[]> {
    const init = new Date(initDate);
    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59);
    const payorders = await this.payorderRepository.find({
      where: {
        createdAt: Between(init, end),
      },
      relations: [
        'user',
        'operator',
        'detailPayorders',
        'detailPayorders.service',
      ],
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    });

    payorders.forEach((payorder) => {
      payorder.total = payorder.detailPayorders.reduce(
        (total, detailPayorder) => {
          const subtotal = detailPayorder.count * detailPayorder.service.amount;
          return total + subtotal;
        },
        0,
      );
    });

    return payorders;
  }
  async getPayorder(id: number) {
    const payorder = await this.payorderRepository.findOne({
      relations: ['operator'],
      where: { id },
    });
    const detailPayorders = await this.detailPayorderRepository.find({
      relations: ['service', 'payorder'],
      where: {
        payorder: { id },
      },
    });
    const detailPayordersMap = detailPayorders.map((detailPayorder) => {
      return {
        serviceId: detailPayorder.service.id,
        name: detailPayorder.service.name,
        amount: detailPayorder.service.amount,
        count: detailPayorder.count,
        total: detailPayorder.count * detailPayorder.service.amount,
      };
    });
    // count amount total sum detailPayordersMap
    const amount = detailPayordersMap.reduce((acc, cur) => {
      return acc + cur.total;
    }, 0);
    const data = {
      ...payorder,
      detailPayorders: detailPayordersMap,
      amount,
    };
    return data;
  }

  async createPayorder(data: createPayorderDto, userId: number) {
    const user = await this.userService.getUserFilter({ id: userId });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    const operator = await this.operatorService.getOperator(data.operatorId);
    const newPayorder = {
      reason: data.reason,
      operator,
      user,
      detail: data.detail,
      amountExtra: data.amountExtra,
      detailExtra: data.detailExtra,
    };
    const payorder = await this.payorderRepository.create(newPayorder);
    await this.payorderRepository.save(payorder);

    data.detailPayorders.map(async (detailPayorder) => {
      const service = await this.serviceService.getService(
        detailPayorder.serviceId,
      );
      const newDetail = {
        service,
        payorder,
        count: detailPayorder.count,
      };
      const detail = this.detailPayorderRepository.create(newDetail);
      return this.detailPayorderRepository.save(detail);
    });

    return payorder;
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
    const user = await this.userService.getUserFilter({ id: userId });
    const operator = await this.operatorService.getOperator(data.operatorId);
    const updatePayorder = {
      reason: data.reason,
      detail: data.detail,
      user,
      operator,
      amountExtra: data.amountExtra,
      detailExtra: data.detailExtra,
    };
    // update detail payorder
    const detailPayorders = await this.detailPayorderRepository.find({
      where: { payorder: { id } },
    });
    await this.detailPayorderRepository.remove(detailPayorders);

    data.detailPayorders.map(async (detailPayorder) => {
      const service = await this.serviceService.getService(
        detailPayorder.serviceId,
      );
      const newDetail = {
        service,
        payorder,
        count: detailPayorder.count,
      };
      const detail = this.detailPayorderRepository.create(newDetail);
      return this.detailPayorderRepository.save(detail);
    });

    return await this.payorderRepository.update(id, updatePayorder);
  }
  async deletePayorder(id: number) {
    try {
      const detailPayorders = await this.detailPayorderRepository.find({
        where: { payorder: { id } },
      });
      await this.detailPayorderRepository.remove(detailPayorders);
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
