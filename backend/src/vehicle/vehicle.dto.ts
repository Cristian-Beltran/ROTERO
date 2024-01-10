import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { Modality, TypeService, TypeVehicle } from './vehicle.entity';
import { PartialType } from '@nestjs/mapped-types';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  typeService: TypeService;
  @IsString()
  @IsNotEmpty()
  modality: Modality;
  @IsNumber()
  @IsNotEmpty()
  maxLoad: number;
  @IsNumber()
  @IsNotEmpty()
  maxPass: number;
  @IsString()
  @IsNotEmpty()
  typeVehicle: TypeVehicle;
  @IsString()
  @IsNotEmpty()
  model: string;
  @IsString()
  @IsNotEmpty()
  brand: string;
  @IsString()
  @IsNotEmpty()
  motor: string;
  @IsString()
  @IsNotEmpty()
  chassis: string;
  @IsBoolean()
  @IsNotEmpty()
  soat: boolean;
  @IsBoolean()
  @IsNotEmpty()
  inspection: boolean;
  @IsString()
  @IsNotEmpty()
  sure: string;
  @IsString()
  @IsNotEmpty()
  plate: string;
  @IsNumber()
  @IsNotEmpty()
  ownerId: number;
  @IsNumber()
  @IsNotEmpty()
  driverId: number;
  @IsNumber()
  @IsNotEmpty()
  operatorId: number;
  @IsNumber()
  @IsNotEmpty()
  classVehicleId: number;
}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
