import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description?: string;
  @IsString()
  @IsNotEmpty()
  level: string;
  @IsNotEmpty()
  @IsArray()
  availableLanguages: string[];
  @IsNumber()
  @IsNotEmpty()
  languageId: number;
}
