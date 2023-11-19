import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateWordDto } from './create-word.dto';
import { Type } from 'class-transformer';

export class CreateLessonDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  description?: string;
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWordDto)
  words: CreateWordDto[];
}
