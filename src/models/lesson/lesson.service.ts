import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { WordService } from '../word/word.service';

@Injectable()
export class LessonService {
  constructor(
    private prisma: PrismaService,
    private wordService: WordService,
  ) {}

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

  async getLesson(id: number, userId: number) {
    const lp = await this.prisma.userLessonProgress.findFirst({
      where: { userId, lessonId: id },
    });
    const ls = await this.prisma.lesson.findUnique({
      where: { id },
      include: { _count: true, words: true },
    });
    return { ...ls, userLessonProgress: lp };
  }

  async startLesson({
    userId,
    lessonId,
    courseId,
  }: {
    userId: number;
    lessonId: number;
    courseId: number;
  }) {
    await this.prisma.course.update({
      where: { id: courseId },
      data: { users: { connect: { id: userId } } },
    });
    const courseProgress = await this.prisma.userCourseProgress.create({
      data: {
        percentage: 0,
        user: { connect: { id: userId } },
        course: { connect: { id: courseId } },
      },
    });
    const userLessonProgress = await this.prisma.userLessonProgress.create({
      data: {
        percentage: 0,
        completedWords: 0,
        givenWords: 0,
        lesson: { connect: { id: lessonId } },
        user: { connect: { id: userId } },
        courseProgress: { connect: { id: courseProgress.id } },
      },
    });

    return this.wordService.nextWord(userId, userLessonProgress.id);
  }
}
