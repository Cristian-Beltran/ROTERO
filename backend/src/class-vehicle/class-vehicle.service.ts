import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassVehicle } from './class-vehicle.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import {
  CreateClassVehicleDto,
  UpdateClassVehicleDto,
} from './class-vehicle.dto';

@Injectable()
export class ClassVehicleService {
  constructor(
    @InjectRepository(ClassVehicle)
    private classVehicleRepository: Repository<ClassVehicle>,
    private userService: UsersService,
  ) {}

  async getClassVehicles(): Promise<ClassVehicle[]> {
    return await this.classVehicleRepository.find({
      relations: ['user']
    });
  }
  async getClassVehicle(id: number): Promise<ClassVehicle> {
    return await this.classVehicleRepository.findOne({
      where: { id },
    });
  }
  async createClassVehicle(
    data: CreateClassVehicleDto,
    userId: number,
  ): Promise<ClassVehicle> {
    const user = await this.userService.getUserFilter({ id: userId });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    const classVehicleData = {
      ...data,
      user,
    };
    return this.classVehicleRepository.save(classVehicleData);
  }
  async updateClassVehicle(
    id: number,
    data: UpdateClassVehicleDto,
    userId: number,
  ) {
    const user = await this.userService.getUserFilter({ id: userId });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    const classVehicle = await this.classVehicleRepository.findOne({
      where: { id },
    });
    if (!classVehicle) {
      throw new HttpException(
        'La clase de vehiculo no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    const classVehicleData = {
      ...data,
      user,
    };
    await this.classVehicleRepository.update(id, classVehicleData);
    return await this.classVehicleRepository.findOne({
      where: { id },
    });
  }
  async deleteClassVehicle(id: number) {
    const classVehicle = await this.classVehicleRepository.findOne({
      where: { id },
    });
    if (!classVehicle) {
      throw new HttpException(
        'La clase de vehiculo no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.classVehicleRepository.delete(classVehicle);
  }
}
