import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class createSantionDto {
  @IsString()
  @IsNotEmpty()
  readonly detail: string;
  @IsNumber()
  @IsNotEmpty()
  operatorId: number;
  @IsNumber()
  @IsNotEmpty()
  readonly typeSantionId: number;
}

export class updateSantionDto extends PartialType(createSantionDto) {}
