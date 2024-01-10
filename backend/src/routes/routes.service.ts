import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from './routes.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { CreateRouteDto } from './routes.dto';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route) private routeRepository: Repository<Route>,
    private userService: UsersService,
    private vehicleService: VehicleService,
  ) {}
  async getRoutes(): Promise<Route[]> {
    const routes = await this.routeRepository.find({
      relations: ['user', 'vehicle', 'vehicle.operator'],
    });
    return routes;
  }
  async getRoute(id: number): Promise<Route> {
    const route = await this.routeRepository.findOne({
      relations: ['vehicle', 'vehicle.operator'],
      where: { id },
    });
    return route;
  }
  async createRoute(data: CreateRouteDto, userId: number): Promise<Route> {
    const user = await this.userService.getUser(userId);
    if (!user) throw new Error('Usuario no encontrado');
    const vehicle = await this.vehicleService.getVehicle(data.vehicleId);
    if (!vehicle) throw new Error('Vehiculo no encontrado');
    const newRoute = {
      user,
      vehicle,
      description: data.description,
      distance: data.distance,
      startText: data.startText,
      endText: data.endText,
      hourEntry: data.hourEntry,
      hourExit: data.hourExit,
      dayEntry: data.dayEntry,
      dayExit: data.dayExit,
      routeArray: JSON.stringify(data.routeArray)
    };
    return await this.routeRepository.save(newRoute);
  }
  async updateRoute(id: number, data: CreateRouteDto, userId: number) {
    const route = await this.routeRepository.findOne({ where: { id } });
    if (!route) throw new Error('Ruta no encontrada');
    const user = await this.userService.getUser(userId);
    if (!user) throw new Error('Usuario no encontrado');
    const vehicle = await this.vehicleService.getVehicle(data.vehicleId);
    if (!vehicle) throw new Error('Vehiculo no encontrado');
    const newRoute = {
      user,
      vehicle,
      description: data.description,
      distance: data.distance,
      startText: data.startText,
      endText: data.endText,
      hourEntry: data.hourEntry,
      hourExit: data.hourExit,
      dayEntry: data.dayEntry,
      dayExit: data.dayExit,
      routeArray: JSON.stringify(data.routeArray)
    };
    await this.routeRepository.update(id, newRoute);
    return this.routeRepository.findOne({where : { id }})
  }
  async deleteRoute(id: number) {
    try {
      const route = await this.routeRepository.findOne({ where: { id } });
      if (!route) throw new Error('Ruta no encontrada');
      return await this.routeRepository.delete(id);
    } catch (error) {
      return error;
    }
  }
  async uploadFiles(id: number, url: string) {
    const route = await this.getRoute(id);
    if (!route) {
      throw new HttpException('El operador no existe', HttpStatus.NOT_FOUND);
    }
    await this.routeRepository.update(id, {
      routeFile: url,
    });
    return true;
  }
}
