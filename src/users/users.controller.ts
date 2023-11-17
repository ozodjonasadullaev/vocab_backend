import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser, Roles } from 'src/decorators';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
