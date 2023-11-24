import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  firstName?: string;
  @IsString()
  lastName?: string;
  phone?: string;
  country?: string;
  learning_languages?: string[];
}
