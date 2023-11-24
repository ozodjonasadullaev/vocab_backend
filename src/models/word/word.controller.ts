import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { WordService } from './word.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/decorators';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('word')
export class WordController {
  constructor(private wordService: WordService) {}
  @Post('next')
  nextWord(@GetUser() user: User, @Body() body: { lessonId: number }) {
    return this.wordService.nextWord(user.id, body.lessonId);
  }
  @Post('nextstep')
  nextStep(@GetUser() user: User, @Body() body: { lessonId: number }) {
    return this.wordService.nextstep(user.id, body.lessonId);
  }
}
