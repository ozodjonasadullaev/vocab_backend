import { Controller, UseGuards } from '@nestjs/common';
import { WordService } from './word.service';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('word')
export class WordController {
  constructor(private wordService: WordService) {}
   createWord(){
       
   }
}
