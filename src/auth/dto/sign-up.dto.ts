import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  ipAddresses: string[];
  country?: string;
  learning_languages?: string[];
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
