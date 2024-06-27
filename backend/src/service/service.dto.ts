import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createServiceDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly detail: string;
  @IsNumber()
  readonly amount: number;
  @IsString()
  readonly type: ServiceType;
}

export class updateServiceDto extends PartialType(createServiceDto) {}

export enum ServiceType {
  SANCION = 'SANCION',
  PAGO = 'PAGO',
}
