import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './models/users/users.module';
import { LanguageModule } from './models/language/language.module';
import { CourseModule } from './models/course/course.module';
import { LessonModule } from './models/lesson/lesson.module';
import { WordModule } from './models/word/word.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    LanguageModule,
    CourseModule,
    LessonModule,
    WordModule,
  ],
})
export class AppModule {}
