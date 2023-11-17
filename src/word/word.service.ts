import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WordService {
  constructor(private prisma: PrismaService) {}
  createWords(words: CreateWordDto[], groupId: number) {
    return this.prisma.word.createMany({
      data: words.map((w) => ({ ...w, groupId })),
    });
  }
}
