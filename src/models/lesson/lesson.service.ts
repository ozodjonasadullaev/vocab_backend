import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}
  createLesson({ courseId, ...dto }: CreateLessonDto) {
    return this.prisma.lesson.create({
      data: { ...dto, course: { connect: { id: courseId } } },
    });
  }
  getLesson(id: number) {
    return this.prisma.lesson.findUnique({
      where: { id },
      include: { _count: true },
    });
  }
}
