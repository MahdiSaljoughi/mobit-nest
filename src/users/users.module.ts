import { AuthGuard } from './../auth/auth.guard';
import { RoleGuard } from './../role/role.guard';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, RoleGuard],
})
export class UsersModule {}
