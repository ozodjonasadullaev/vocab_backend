import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { WordModule } from 'src/word/word.module';

@Module({
  imports: [WordModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
