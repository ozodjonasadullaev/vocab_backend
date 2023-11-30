import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateLanguageDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsArray()
  @IsNotEmpty()
  levels: string[];
}
