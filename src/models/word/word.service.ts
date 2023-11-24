import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WordService {
  constructor(private prisma: PrismaService) {}
  async nextWord(userId: number, lessonId: number) {
    const lp = await this.prisma.userLessonProgress.findFirst({
      where: { lessonId, userId },
    });
    const words = await this.prisma.word.findMany({
      where: { lessonId: lp.lessonId },
      include: { sentences: true },
      orderBy: { id: 'asc' },
    });

    return words.slice(0, lp.givenWords);
  }
  async nextstep(userId: number, lessonId: number) {
    const lp = await this.prisma.userLessonProgress.findFirst({
      where: { lessonId, userId },
    });
    const words = await this.prisma.word.findMany({
      where: { lessonId: lp.lessonId },
      include: { sentences: true },
      orderBy: { id: 'asc' },
    });
    await this.prisma.userLessonProgress.update({
      where: { id: lp.id },
      data: {
        givenWords: lp.givenWords + 5,
        completedWords: lp.completedWords + 5,
      },
    });
    return words.slice(0, lp.givenWords + 5);
  }
}
