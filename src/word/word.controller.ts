import { Body, Controller, Post } from '@nestjs/common';
import { WordService } from './word.service';

@Controller('word')
export class WordController {
  // constructor(private wordService: WordService){}
  // @Post()
  // createWords(@Body() {words}:{words:CreateWordDto[]}){
  //    return this.wordService.createWords(words)
  // }
}
