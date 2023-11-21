import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { WordService } from '../word/word.service';

@Module({
  controllers: [LessonController],
  providers: [LessonService, WordService],
})
export class LessonModule {}
