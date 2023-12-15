import { PartialType } from '@nestjs/mapped-types';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  readonly birthday: Date;
  @IsString()
  @IsNotEmpty()
  readonly ci: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  @IsOptional()
  readonly cellphone: string;
  @IsNotEmpty()
  @IsOptional()
  roleId?: number;
  @IsString()
  @IsOptional()
  password?: string;
  @IsDate()
  @IsOptional()
  readonly lastLogin?: Date;
  @IsOptional()
  role: any;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class FilterUserDto {
  readonly ci?: string;
  readonly id?: number;
  readonly email?: string;
  readonly birthday?: Date;
}
