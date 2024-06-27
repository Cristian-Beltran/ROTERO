import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createPayorderDto {
  @IsString()
  @IsNotEmpty()
  readonly reason: string;
  @IsString()
  @IsNotEmpty()
  readonly detail: string;
  @IsNumber()
  @IsNotEmpty()
  operatorId: number;
  @IsNumber()
  readonly amountExtra: number;
  @IsString()
  readonly detailExtra: string;
  @IsArray()
  @IsNotEmpty()
  readonly detailPayorders: detailPayorder[];
}

export class updatePayorderDto extends PartialType(createPayorderDto) {}

export class detailPayorder {
  serviceId: number;
  count: number;
}
