import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class createRoleDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsBoolean()
  @IsNotEmpty()
  readonly pDriver: boolean;
  @IsBoolean()
  @IsNotEmpty()
  readonly pOwner: boolean;
  @IsBoolean()
  @IsNotEmpty()
  readonly pOperator: boolean;
  @IsBoolean()
  @IsNotEmpty()
  readonly pRoute: boolean;

}

export class updateRoleDto extends PartialType(createRoleDto) {}
