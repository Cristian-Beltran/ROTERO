import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Operator } from './operators.entity';
import { CreateOperatorDto, UpdateOperatorDto } from './operators.dto';
import { PermissionLevel } from 'src/users/users.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/users.dto';
@Injectable()
export class OperatorsService {
  constructor(
    @InjectRepository(Operator)
    private operatorRepository: Repository<Operator>,
    private userService: UsersService,
  ) {}
  async getOperators(): Promise<Operator[]> {
    const operators = await this.operatorRepository.find({
      relations: ['user', 'operator'],
    });
    return operators;
  }
  async getOperator(id: number): Promise<Operator> {
    const operator = await this.operatorRepository.findOne({
      where: { id },
      relations: ['user', 'operator'],
    });
    return operator;
  }
  async createOperator(
    data: CreateOperatorDto,
    operator: CreateUserDto,
    userId: number,
    fields?: {
      route?: string;
      operatorCertification?: string;
      administrativeResolution?: string;
    },
  ) {
    const user = await this.userService.getUserFilter({ id: userId });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    const operatorUser = await this.userService.createUser(
      PermissionLevel.OPERADOR,
      operator,
    );

    const newOperator = {
      ...data,
      user,
      operator: operatorUser,
      ...fields,
    };
    return this.operatorRepository.save(newOperator);
  }

  async updateOperator(
    id: number,
    data: UpdateOperatorDto,
    operatorUser: UpdateUserDto,
    userId: number,
    fields?: {
      route?: string;
      operatorCertification?: string;
      administrativeResolution?: string;
    },
  ) {
    const user = await this.userService.getUserFilter({ id: userId });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    const operatorsUpdate = {
      ...data,
      ...fields,
    };
    await this.operatorRepository.update(id, operatorsUpdate);
    const operator = await this.operatorRepository.findOne({ where: { id } });
    const operatorUpdateUser = await this.userService.updateUser(
      operator.operator.id,
      operatorUser,
    );
    return { operator, operatorUpdateUser };
  }
}
