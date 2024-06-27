import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ServiceType, createServiceDto, updateServiceDto } from './service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    private userService: UsersService,
  ) {}
  async getServices(type: ServiceType): Promise<Service[]> {
    const services = await this.serviceRepository.find({
      where: { type: type },
      relations: ['user'],
    });
    return services;
  }
  async getService(id: number): Promise<Service> {
    const service = await this.serviceRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return service;
  }
  async createService(data: createServiceDto, userId: number) {
    const user = await this.userService.getUserFilter({ id: userId });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    const service = this.serviceRepository.create(data);
    service.user = user;
    await this.serviceRepository.save(service);
    return service;
  }

  async updateService(id: number, data: updateServiceDto, userId: number) {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) {
      throw new HttpException('El servicio no existe', HttpStatus.NOT_FOUND);
    }
    // update service and userId
    service.name = data.name;
    service.detail = data.detail;
    service.amount = data.amount;
    service.type = data.type;
    const user = await this.userService.getUserFilter({ id: userId });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    service.user = user;
    await this.serviceRepository.save(service);
    return service;
  }
  async deleteService(id: number) {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) {
      throw new HttpException('El servicio no existe', HttpStatus.NOT_FOUND);
    }
    await this.serviceRepository.delete(service);
    return service;
  }
}
