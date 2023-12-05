import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class LanguageService {
  constructor(
    private prisma: PrismaService,
    private readonly socket: EventsGateway,
  ) {}
  async createlanguage(dto: CreateLanguageDto) {
    const newLanguage = await this.prisma.language.create({
      data: dto,
      include: { _count: true },
    });
    const data = await this.prisma.language.findMany({
      include: { _count: true, courses: true },
    });
    this.socket.handleResourceChange({ source: 'language', data });
    return newLanguage;
  }
  getLanguages() {
    return this.prisma.language.findMany({
      include: { _count: true, courses: true },
    });
  }
}
