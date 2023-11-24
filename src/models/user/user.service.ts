import { Injectable } from '@nestjs/common';
import { UserUpdateDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  updateUser(userId: number, dto: UserUpdateDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
    });
  }
  getAll() {
    return this.prisma.user.findMany();
  }
}
