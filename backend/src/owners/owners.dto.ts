import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Operator } from 'src/operators/operators.entity';

export class createOwnerDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
  @IsString()
  @IsNotEmpty()
  readonly ci: string;
  @IsNumber()
  @IsNotEmpty()
  operatorId: number;
}

export class updateOwnerDto extends PartialType(createOwnerDto) {}
