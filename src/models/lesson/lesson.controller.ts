import { Body, Controller, Param, Post, UseGuards, Get } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/decorators';

@UseGuards(JwtGuard)
@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}
  @UseGuards(RoleGuard)
  @Roles('admin')
  @Post()
  createLesson(@Body() dto: CreateLessonDto) {
    return this.lessonService.createLesson(dto);
  }
  @Get(':id')
  getLesson(@Param('id') id: string) {
    return this.lessonService.getLesson(+id);
  }
}
