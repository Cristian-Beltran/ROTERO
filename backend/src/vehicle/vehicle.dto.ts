import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { Modality, TypeService } from './vehicle.entity';
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
  typeVehicle: string
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
  plate: string;
  @IsNumber()
  @IsNotEmpty()
  ownerId: number;
  @IsNumber()
  @IsNotEmpty()
  operatorId: number;
  @IsNumber()
  @IsNotEmpty()
  classVehicle: string;
}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
