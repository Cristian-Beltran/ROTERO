import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTypePayorderDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly detail: string;
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;
}

export class UpdateTypePayorderDto extends PartialType(CreateTypePayorderDto) {}
