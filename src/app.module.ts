import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './models/user/user.module';
import { LanguageModule } from './models/language/language.module';
import { CourseModule } from './models/course/course.module';
import { LessonModule } from './models/lesson/lesson.module';
import { WordModule } from './models/word/word.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    LanguageModule,
    CourseModule,
    LessonModule,
    WordModule,
  ],
})
export class AppModule {}
