import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId: number = request.user?.id;

    if (!userId) {
      throw new ForbiddenException('کاربر احراز هویت نشده است');
    }

    const user = await this.userService.findOne(userId);

    if (!user || user.role !== 'ADMIN') {
      throw new ForbiddenException('شما مجوز دسترسی ندارید');
    }

    return true;
  }
}
