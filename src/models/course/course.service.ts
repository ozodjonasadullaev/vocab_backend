import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}
  createCourse({ languageId, ...dto }: CreateCourseDto) {
    return this.prisma.course.create({
      data: { ...dto, language: { connect: { id: languageId } } },
    });
  }
  getCourses() {
    return this.prisma.course.findMany({
      include: {
        _count: true,
      },
    });
  }
  getCourseById(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
      include: { lessons: { include: { _count: true } }, _count: true },
    });
  }
}
