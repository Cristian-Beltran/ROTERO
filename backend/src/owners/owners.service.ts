import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './owners.entity';
import { Repository } from 'typeorm';
import { OperatorsService } from 'src/operators/operators.service';
import { UsersService } from 'src/users/users.service';
import { createOwnerDto, updateOwnerDto } from './owners.dto';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
    private operatorService: OperatorsService,
    private userService: UsersService,
  ) {}
  async getOwners(operatorId: number): Promise<Owner[]> {
    const owners = await this.ownerRepository.find({
      relations: ['operator', 'user'],
      where: { operator: { id: operatorId } },
    });
    return owners;
  }

  async getOwner(id: number): Promise<Owner> {
    const owner = await this.ownerRepository.findOne({
      relations: ['operator'],
      where: { id },
    });
    return owner;
  }
  async createOwner(data: createOwnerDto, userId: number) {
    const user = await this.userService.getUserFilter({ id: userId });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    const operator = await this.operatorService.getOperator(data.operatorId);
    const newOwner = {
      operator,
      user,
      firstName: data.firstName,
      lastName: data.lastName,
      ci: data.ci,
      cellphone: data.cellphone,
    };
    return await this.ownerRepository.save(newOwner);
  }
  async updateOwner(id: number, data: updateOwnerDto, userId: number) {
    const owner = await this.ownerRepository.findOne({ where: { id } });
    if (!owner) {
      throw new HttpException('El propietario no existe', HttpStatus.NOT_FOUND);
    }
    const user = await this.userService.getUserFilter({ id: userId });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    const operator = await this.operatorService.getOperator(data.operatorId);
    const newOwner = {
      operator,
      user,
      firstName: data.firstName,
      lastName: data.lastName,
      ci: data.ci,
      cellphone: data.cellphone,
    };
    return await this.ownerRepository.update(id, newOwner);
  }
  async deleteOwner(id: number) {
    try {
      const owner = await this.ownerRepository.findOne({ where: { id } });
      if (!owner) {
        throw new HttpException(
          'El propietario no existe',
          HttpStatus.NOT_FOUND,
        );
      }
      return await this.ownerRepository.delete(id);
    } catch (error) {
      return error;
    }
  }
}
