import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Severity } from './type-santions.entity';

export class createTypeSantionDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly detail: string;
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;
  @IsString()
  @IsNotEmpty()
  readonly severity: Severity;
}

export class updateTypeSantionDto extends PartialType(createTypeSantionDto) {}
