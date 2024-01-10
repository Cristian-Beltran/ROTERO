import { PartialType } from '@nestjs/mapped-types';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

import { Transform } from 'class-transformer';

export class CreateOperatorDto {
  @IsString()
  @IsNotEmpty()
  businessName: string;
  @IsString()
  @IsNotEmpty()
  legalRepresentative: string;
  @IsString()
  @IsNotEmpty()
  owner: string;
  @IsString()
  @IsNotEmpty()
  seprec: string;
  @IsString()
  @IsNotEmpty()
  nit: string;
  @IsString()
  @IsNotEmpty()
  entityMatris: string;
  @IsString()
  @IsNotEmpty()
  color: string;
  @IsString()
  @IsNotEmpty()
  route: string;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  dateRa: Date;
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  initialAffiliates?: number;
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  currentAffiliates?: number;
  @IsOptional()
  @IsString()
  tecnicalNumber: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  legalNumber: string;
  @IsString()
  @IsNotEmpty()
  observations: string;
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  validity: Date;
}
export class UpdateOperatorDto extends PartialType(CreateOperatorDto) {}

export class FilterUserDto {
  readonly ci?: string;
  readonly id?: number;
  readonly email?: string;
  readonly birthday?: Date;
}
