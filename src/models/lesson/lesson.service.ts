import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}
  async createLesson({ courseId, words, ...dto }: CreateLessonDto) {
    if (words.length === 0) {
      throw new HttpException(
        'You should enter at least one word to create a lesson',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prisma.$transaction(async (prisma) => {
      const lesson = await prisma.lesson.create({
        data: {
          ...dto,
          course: { connect: { id: courseId } },
          words: {
            createMany: {
              data: words.map((w) => ({ ...w })),
            },
          },
        },
        include: { _count: true },
      });

      return lesson;
    });
  }

  getLesson(id: number) {
    return this.prisma.lesson.findUnique({
      where: { id },
      include: { _count: true, words: true },
    });
  }
}
