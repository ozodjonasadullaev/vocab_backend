import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser, Roles } from 'src/decorators';
import { User } from '@prisma/client';
import { UserUpdateDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
  @Get()
  getAll() {
    return this.userService.getAll();
  }
  @Patch()
  updateUser(@GetUser('id') userId: number, @Body() dto: UserUpdateDto) {
    return this.userService.updateUser(userId, dto);
  }
}
