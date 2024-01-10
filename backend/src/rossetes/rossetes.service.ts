import { Injectable, UnauthorizedException,HttpStatus,HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rossete, Status } from './rossetes.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { RoutesService } from 'src/routes/routes.service';
import { CreateRosseteDto, UpdateRosseteDto } from './rossetes.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.constans';
import { PermissionLevel } from 'src/users/users.entity'; 

@Injectable()
export class RossetesService {
  constructor(
    @InjectRepository(Rossete) private rosseteRepository: Repository<Rossete>,
    private jwtService: JwtService,
    private userService: UsersService,
    private routeService: RoutesService,
  ) {}
  async readQrRossete( token:string, userId:number ) : Promise<Rossete> {
    let id:number;
    try{
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      id = payload.id
    }catch{
      throw new UnauthorizedException('La roseta no es valida');
    }
    const user = await this.userService.getUserFilter({ id:userId })
    if(!user)
      throw new HttpException('Usuario no encontrado',HttpStatus.NOT_FOUND)
    if(user.permissionLevel === 'CONSULTOR'){
      const data = ['route.vehicle','route.vehicle.classVehicle'];
      if(user.role.pRoute)
        data.push('route')
      if(user.role.pDriver)
        data.push('route.vehicle.driver')
      if(user.role.pOperator)
        data.push('route.vehicle.operator')
      if(user.role.pOwner)
        data.push('route.vehicle.owner')
      const rossete = await this.rosseteRepository.findOne({
        where: { id },
        relations: data
      })
      if(!rossete)
        throw new HttpException('No se encontro la roseta',HttpStatus.NOT_FOUND);
      if(rossete.status === 'BAJA') 
        throw new HttpException('La roseta esta dada de baja',HttpStatus.CONFLICT)
      return rossete
    }
    else{
      const rossete = await this.rosseteRepository.findOne({
        where: { id },
        relations: ['route','route.vehicle','route.vehicle.classVehicle','route.vehicle.driver','route.vehicle.owner','route.vehicle.operator']
      })
      if(!rossete)
        throw new HttpException('No se encontro la roseta',HttpStatus.NOT_FOUND);
      if(rossete.status === 'BAJA') 
        throw new HttpException('La roseta esta dada de baja',HttpStatus.CONFLICT)
      return rossete;
    }
  }
  async getRossetes(): Promise<Rossete[]> {
    const rossetes = await this.rosseteRepository.find({
      relations: ['route', 'user', 'route.vehicle', 'route.vehicle.operator'],
    });
    return rossetes;
  }
  async getRossete(id: number): Promise<Rossete> {
    const rossete = await this.rosseteRepository.findOne({
      relations: ['route', 'route.vehicle', 'route.vehicle.operator'],
      where: { id },
    });
    return rossete;
  }
  async createRossete(
    data: CreateRosseteDto,
    userId: number,
  ): Promise<Rossete> {
    const user = await this.userService.getUserFilter({ id: userId });
    if (!user) throw new Error('Usuario no encontrado');
    const route = await this.routeService.getRoute(data.routeId);
    if (!route) throw new Error('Ruta no encontrada');
    const newRossete = {
      user,
      route,
      expiration: data.expiration,
      status: data.status,
    };
    return await this.rosseteRepository.save(newRossete);
  }
  async updateRossete(
    id: number,
    data: UpdateRosseteDto,
    userId: number,
  ): Promise<Rossete> {
    const rossete = await this.rosseteRepository.findOne({ where: { id } });
    if (!rossete) throw new Error('Rossete no encontrado');
    const user = await this.userService.getUserFilter({ id: userId });
    if (!user) throw new Error('Usuario no encontrado');
    const route = await this.routeService.getRoute(data.routeId);
    if (!route) throw new Error('Ruta no encontrada');
    const newRossete = {
      user,
      route,
      expiration: data.expiration,
      status: data.status,
    };
    await this.rosseteRepository.update(id, newRossete);
    return await this.rosseteRepository.findOne({ where: { id } });
  }
  async deleteRossete(id: number): Promise<boolean> {
    const rossete = await this.rosseteRepository.findOne({ where: { id } });
    if (!rossete) throw new Error('Rossete no encontrado');
    await this.rosseteRepository.delete(id);
    return true;
  }
  async downRossete(id: number): Promise<Rossete> {
    const rossete = await this.rosseteRepository.findOne({ where: { id } });
    if (!rossete) throw new Error('Rossete no encontrado');
    await this.rosseteRepository.update(id, {
      status: Status.BAJA,
    });
    return await this.rosseteRepository.findOne({ where: { id } });
  }

}
