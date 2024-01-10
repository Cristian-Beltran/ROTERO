import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Operator } from 'src/operators/operators.entity';

export class createDriverDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
  @IsString()
  @IsNotEmpty()
  readonly ci: string;
  @IsString()
  @IsNotEmpty()
  readonly cellphone: string;
  @IsNumber()
  @IsNotEmpty()
  operatorId: number;
  @IsOptional()
  @IsObject()
  operator?: Operator;
}

export class updateDriverDto extends PartialType(createDriverDto) {}
