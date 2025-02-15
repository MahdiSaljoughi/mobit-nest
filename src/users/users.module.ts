import { AuthGuard } from './../auth/auth.guard';
import { RoleGuard } from './../role/role.guard';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, RoleGuard],
})
export class UsersModule {}
