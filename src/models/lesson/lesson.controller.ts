import { Body, Controller, Param, Post, UseGuards, Get } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { GetUser, Roles } from 'src/decorators';
import { User } from '@prisma/client';

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
  getLesson(@Param('id') id: string, @GetUser('id') userId: number) {
    return this.lessonService.getLesson(+id, userId);
  }
  @Post('start')
  startLesson(
    @GetUser() user: User,
    @Body() { courseId, lessonId }: { courseId: number; lessonId: number },
  ) {
    return this.lessonService.startLesson({
      userId: user.id,
      courseId: courseId,
      lessonId: lessonId,
    });
  }
}
