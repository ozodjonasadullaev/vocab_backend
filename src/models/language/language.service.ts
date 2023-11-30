import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LanguageService {
  constructor(private prisma: PrismaService) {}
  createlanguage(dto: CreateLanguageDto) {
    return this.prisma.language.create({
      data: dto,
      include: { _count: true },
    });
  }
  getLanguages() {
    return this.prisma.language.findMany({ include: { _count: true } });
  }
}
