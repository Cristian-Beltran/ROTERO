import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateRouteDto {
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsNumber()
  @IsNotEmpty()
  distance: number;
  @IsString()
  @IsNotEmpty()
  hourEntry: string;
  @IsString()
  @IsNotEmpty()
  hourExit: string;
  @IsString()
  @IsNotEmpty()
  dayEntry: string;
  @IsString()
  @IsNotEmpty()
  dayExit: string;
  @IsArray()
  @IsNotEmpty()
  routeArray: []; 
  @IsNumber()
  @IsNotEmpty()
  operatorId: number;
}

export class UpdateRouteDto extends PartialType(CreateRouteDto) {}
