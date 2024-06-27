import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Operator } from './operators.entity';
import { CreateOperatorDto, UpdateOperatorDto } from './operators.dto';
import { PermissionLevel } from 'src/users/users.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/users.dto';
import { State } from './operators.entity';
@Injectable()
export class OperatorsService {
  constructor(
    @InjectRepository(Operator)
    private operatorRepository: Repository<Operator>,
    private userService: UsersService,
  ) {}
  async getTotalEmployeeOperators() {
    const result = await this.operatorRepository
      .createQueryBuilder('operator')
      .select('operator.businessName as businessName')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(driver.id) as driverCount')
          .from('driver', 'driver')
          .where('driver.operator.id = operator.id');
      }, 'driverCount')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(owner.id) as ownerCount')
          .from('owner', 'owner')
          .where('owner.operator.id = operator.id');
      }, 'ownerCount')
      .groupBy('operator.businessName')
      .getRawMany();
    return result;
  }
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
      state: State.PROCESO,
    };
    return await this.operatorRepository.save(newOperator);
  }

  async updateOperator(
    id: number,
    data: UpdateOperatorDto,
    operatorUser: UpdateUserDto,
    userId: number,
  ) {
    const user = await this.userService.getUserFilter({ id: userId });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    const operatorsUpdate = {
      ...data,
    };
    await this.operatorRepository.update(id, operatorsUpdate);
    const operator = await this.operatorRepository.findOne({
      where: { id },
      relations: ['operator'],
    });
    const operatorUpdateUser = await this.userService.updateUser(
      operator.operator.id,
      operatorUser,
    );
    return { operator, operatorUpdateUser };
  }
  async uploadFiles(id: number, url: string, location: string) {
    const operator = await this.operatorRepository.findOne({ where: { id } });
    if (!operator) {
      throw new HttpException('El operador no existe', HttpStatus.NOT_FOUND);
    }
    const data = {
      [location]: url,
    };

    return await this.operatorRepository.update(id, data);
  }
  async deleteOperator(id: number) {
    const operator = await this.operatorRepository.findOne({ where: { id } });
    if (!operator) {
      throw new HttpException('El operador no existe', HttpStatus.NOT_FOUND);
    }
    await this.operatorRepository.update(id, {
      state: State.BAJA,
    });
    return true;
  }
  async authorizeOperator(id: number) {
    const operator = await this.operatorRepository.findOne({ where: { id } });
    if (!operator) {
      throw new HttpException('El operador no existe', HttpStatus.NOT_FOUND);
    }
    if (operator.state === 'AUTORIZADO') {
      throw new HttpException(
        'El operador ya esta autorizado',
        HttpStatus.CONFLICT,
      );
    }
    const date = new Date();
    await this.operatorRepository.update(id, {
      state: State.AUTORIZADO,
      authorizationDate: date,
    });
    return true;
  }
}
