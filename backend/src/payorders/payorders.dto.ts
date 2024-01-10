import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createPayorderDto {
  @IsString()
  @IsNotEmpty()
  readonly detail: string;
  @IsNumber()
  @IsNotEmpty()
  operatorId: number;
  @IsNumber()
  @IsNotEmpty()
  readonly typePayorderId: number;
}

export class updatePayorderDto extends PartialType(createPayorderDto) {}
