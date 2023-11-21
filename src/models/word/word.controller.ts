import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { WordService } from './word.service';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUser } from 'src/decorators';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('word')
export class WordController {
  constructor(
    private wordService: WordService,
    private prisma: PrismaService,
  ) {}
  @Post('next')
  nextWord(@GetUser() user: User, @Body() body: { lp: number }) {
    console.log(body);
    return this.wordService.nextWord(user.id, body.lp);
  }
  @Post('right')
  right(@GetUser() user: User, @Body() body: any) {
    console.log(body);
    return 'next';
    // return this.wordService.nextWord(user.id, body.lp);
  }
}
