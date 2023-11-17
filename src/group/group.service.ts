import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { WordService } from 'src/word/word.service';

@Injectable()
export class GroupService {
  constructor(
    private prisma: PrismaService,
    private wordService: WordService,
  ) {}

  async createGroup(dto: CreateGroupDto) {
    const { words, ...group } = dto;
    const newGroup = await this.prisma.group.create({ data: group });
    await this.wordService.createWords(words, newGroup.id);
    const newWords = await this.prisma.word.findMany({
      where: { groupId: newGroup.id },
    });
    return {
      ...newGroup,
      words: newWords,
    };
  }

  getGroupWords(groupId: number) {
    return this.prisma.word.findMany({ where: { groupId } });
  }
  getGroups() {
    return this.prisma.group.findMany();
  }
}
