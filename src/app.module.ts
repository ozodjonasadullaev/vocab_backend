import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GroupModule } from './group/group.module';
import { WordModule } from './word/word.module';

@Module({
  imports: [PrismaModule, GroupModule, WordModule],
})
export class AppModule {}
