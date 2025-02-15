import { UsersService } from './../users/users.service';
import { AuthGuard } from './../auth/auth.guard';
import { RoleGuard } from './../role/role.guard';
import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, AuthGuard, RoleGuard, UsersService],
})
export class CategoriesModule {}
