import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { OperatorsService } from 'src/operators/operators.service';
import { DriversService } from 'src/drivers/drivers.service';
import { OwnersService } from 'src/owners/owners.service';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicle.dto';
import { ClassVehicleService } from 'src/class-vehicle/class-vehicle.service';
import { PdfService } from 'src/pdf/pdf.service';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle) private vechileRepository: Repository<Vehicle>,
    private userService: UsersService,
    private operatorService: OperatorsService,
    private driverService: DriversService,
    private ownerService: OwnersService,
    private classVehicleService: ClassVehicleService,
    private pdfService: PdfService,
  ) {}
  async getVehicleForClass(): Promise<Vehicle[]> {
    return this.vechileRepository
      .createQueryBuilder('vehicle')
      .innerJoinAndSelect('vehicle.classVehicle', 'classVehicle')
      .select('classVehicle.name as className, COUNT(vehicle.id) as count')
      .groupBy('classVehicle.name')
      .getRawMany();
  }
  async getVehicles(operatorId: number): Promise<Vehicle[]> {
    const vehicles = await this.vechileRepository.find({
      relations: ['operator', 'driver', 'owner', 'user', 'classVehicle'],
      where: { operator: { id: operatorId } },
    });
    return vehicles;
  }
  async getVehicleByPlate(plate: string): Promise<Vehicle> {
    const vehicle = await this.vechileRepository.findOne({
      where: { plate },
      relations: ['driver', 'classVehicle', 'operator'],
    });
    return vehicle;
  }
  async getVehicle(id: number): Promise<Vehicle> {
    const vehicle = await this.vechileRepository.findOne({
      relations: ['operator', 'driver', 'owner', 'classVehicle'],
      where: { id },
    });
    return vehicle;
  }
  async createVehicle(
    data: CreateVehicleDto,
    userId: number,
  ): Promise<Vehicle> {
    const user = await this.userService.getUser(userId);
    if (!user) throw new Error('Usuario no encontrado');
    const operator = await this.operatorService.getOperator(data.operatorId);
    if (!operator) throw new Error('Operador no encontrado');
    const driver = await this.driverService.getDriver(data.driverId);
    if (!driver) throw new Error('Conductor no encontrado');
    const owner = await this.ownerService.getOwner(data.ownerId);
    if (!owner) throw new Error('Propietario no encontrado');
    const classVehicle = await this.classVehicleService.getClassVehicle(
      data.classVehicleId,
    );
    if (!classVehicle) throw new Error('Clase de vehiculo no encontrada');
    const newVehicle = {
      operator,
      driver,
      owner,
      user,
      classVehicle,
      typeService: data.typeService,
      modality: data.modality,
      maxLoad: data.maxLoad,
      maxPass: data.maxPass,
      typeVehicle: data.typeVehicle,
      model: data.model,
      brand: data.brand,
      motor: data.motor,
      chassis: data.chassis,
      soat: data.soat,
      inspection: data.inspection,
      sure: data.sure,
      plate: data.plate,
    };
    return await this.vechileRepository.save(newVehicle);
  }
  async updateVehicle(
    id: number,
    data: UpdateVehicleDto,
    userId: number,
  ): Promise<Vehicle> {
    const vehicle = await this.vechileRepository.findOne({ where: { id } });
    if (!vehicle) throw new Error('Vehiculo no encontrado');
    const user = await this.userService.getUser(userId);
    if (!user) throw new Error('Usuario no encontrado');
    const operator = await this.operatorService.getOperator(data.operatorId);
    if (!operator) throw new Error('Operador no encontrado');
    const driver = await this.driverService.getDriver(data.driverId);
    if (!driver) throw new Error('Conductor no encontrado');
    const owner = await this.ownerService.getOwner(data.ownerId);
    if (!owner) throw new Error('Propietario no encontrado');
    const classVehicle = await this.classVehicleService.getClassVehicle(
      data.classVehicleId,
    );
    if (!classVehicle) throw new Error('Clase de vehiculo no encontrada');
    const newVehicle = {
      operator,
      driver,
      owner,
      user,
      classVehicle,
      typeService: data.typeService,
      modality: data.modality,
      maxLoad: data.maxLoad,
      maxPass: data.maxPass,
      typeVehicle: data.typeVehicle,
      model: data.model,
      brand: data.brand,
      motor: data.motor,
      chassis: data.chassis,
      soat: data.soat,
      inspection: data.inspection,
      sure: data.sure,
      plate: data.plate,
    };
    await this.vechileRepository.update(id, newVehicle);
    return await this.vechileRepository.findOne({ where: { id } });
  }
  async deleteVehicle(id: number): Promise<Vehicle> {
    try {
      const vehicle = await this.vechileRepository.findOne({ where: { id } });
      if (!vehicle) throw new Error('Vehiculo no encontrado');
      const driver = await this.driverService.getDriver(vehicle.driver.id);
      if (!driver) throw new Error('Conductor no encontrado');
      const vehicleDelete = await this.vechileRepository.remove(vehicle);
      await this.driverService.deleteDriver(driver.id);
      return vehicleDelete;
    } catch (error) {
      return error;
    }
  }

  async getVehicleById(plate: string) {
    try {
      const vehicle = await this.vechileRepository.findOne({
        where: { plate },
        relations: ['driver', 'owner'],
      });
      if (!vehicle) throw new Error('Vehiculo no encontrado');
      return vehicle;
    } catch (error) {
      return error;
    }
  }
}
