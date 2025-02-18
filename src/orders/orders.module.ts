import { UsersService } from './../users/users.service';
import { RoleGuard } from './../role/role.guard';
import { AuthGuard } from './../auth/auth.guard';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, UsersService, AuthGuard, RoleGuard],
})
export class OrdersModule {}
