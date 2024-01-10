import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './drivers.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { OperatorsService } from 'src/operators/operators.service';
import { createDriverDto, updateDriverDto } from './drivers.dto';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver) private driverRepository: Repository<Driver>,
    private userService: UsersService,
    private operatorService: OperatorsService,
  ) {}
  async getDrivers(operatorId: number): Promise<Driver[]> {
    const drivers = await this.driverRepository.find({
      relations: ['user', 'operator'],
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      where: { operator: { id: operatorId } },
    });
    return drivers;
  }
  async getDriver(id: number): Promise<Driver> {
    const driver = await this.driverRepository.findOne({
      relations: ['operator'],
      where: { id },
    });
    return driver;
  }
  async createDriver(data: createDriverDto, userId: number): Promise<Driver> {
    const user = await this.userService.getUserFilter({ id: userId });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    const operator = await this.operatorService.getOperator(data.operatorId);
    const newDriver = {
      operator,
      user,
      firstName: data.firstName,
      lastName: data.lastName,
      ci: data.ci,
      cellphone: data.cellphone,
    };
    return await this.driverRepository.save(newDriver);
  }
  async updateDriver(
    id: number,
    data: updateDriverDto,
    userId: number,
  ): Promise<Driver> {
    const driver = await this.driverRepository.findOne({ where: { id } });
    if (!driver) {
      throw new HttpException('El conductor no existe', HttpStatus.NOT_FOUND);
    }
    const user = await this.userService.getUserFilter({ id: userId });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    const operator = await this.operatorService.getOperator(data.operatorId);

    const newDriver = {
      operator,
      user,
      firstName: data.firstName,
      lastName: data.lastName,
      ci: data.ci,
      cellphone: data.cellphone,
    };
    await this.driverRepository.update(id,newDriver)
    return await this.driverRepository.findOne({ where: { id } });
  }
  async deleteDriver(id: number): Promise<Driver> {
    try {
      const driver = await this.driverRepository.findOne({ where: { id } });
      if (!driver) {
        throw new HttpException('El conductor no existe', HttpStatus.NOT_FOUND);
      }
      return await this.driverRepository.remove(driver);
    } catch (error) {
      return error;
    }
  }
}
