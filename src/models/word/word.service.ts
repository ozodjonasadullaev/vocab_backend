import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WordService {
  constructor(private prisma: PrismaService) {}
  async nextWord(userId: number, lessonProgressId: number) {
    const lessonP = await this.prisma.userLessonProgress.findUnique({
      where: { id: lessonProgressId },
      include: { wordProgress: { where: { userId } } },
    });
    const words = await this.prisma.word.findMany({
      where: { lessonId: lessonP.lessonId },
      orderBy: { id: 'asc' },
    });
    const { givenWords, wordProgress } = lessonP;
    const unfinished = wordProgress.filter(
      (wp) => wp.right !== Math.round(givenWords / 5),
    );
    if (wordProgress.length === 0) {
      return { ...words[0], lessonProgressId: lessonP.id };
    }
    if (unfinished.length > 0) {
      return words.find((w) => w.id === unfinished[0].wordId);
    } else {
      const lp = await this.prisma.userLessonProgress.update({
        where: { id: lessonP.id },
        data: {
          givenWords:
            givenWords + 5 > words.length ? words.length : givenWords + 5,
        },
      });
      return { ...words[lp.givenWords - 5], lessonProgressId: lessonP.id };
    }
  }
  async right() {}
}
