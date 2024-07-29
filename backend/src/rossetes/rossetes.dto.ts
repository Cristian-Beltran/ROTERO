import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Status } from './rossetes.entity';

export class CreateRosseteDto {
  @IsString()
  @IsNotEmpty()
  expiration: string;
  @IsString()
  @IsNotEmpty()
  status: Status;
  @IsNumber()
  @IsNotEmpty()
  vehicleId: number;
}

export class UpdateRosseteDto extends PartialType(CreateRosseteDto) {}
