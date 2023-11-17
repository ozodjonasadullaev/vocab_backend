import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'mysql://ozod:ozod@localhost:3306/vocab?schema=public',
        },
      },
    });
  }
}
