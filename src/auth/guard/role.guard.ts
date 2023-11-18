import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true; // No roles defined, allow access by default
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user.id; // Assuming user ID is available in the request
    // Fetch user role from the database using Prisma
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    if (!user || !user.role || !roles.includes(user.role)) {
      return false; // User role doesn't match required roles
    }

    return true; // User has required role
  }
}
