import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWordDto {
  @IsNotEmpty()
  @IsString()
  word: string;
  @IsNotEmpty()
  @IsString()
  translation: string;
}
