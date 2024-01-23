import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
  @IsDate()
  @IsNotEmpty()
  readonly birthday: Date;
  @IsString()
  @IsNotEmpty()
  readonly ci: string;
  @IsString()
  @IsNotEmpty()
  readonly cellphone: string;
}

export class LoginAdminDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class LoginOperatorDto {
  @IsString()
  @IsNotEmpty()
  readonly ci: string;
  @IsDate()
  @IsNotEmpty()
  readonly birthday: Date;
}
