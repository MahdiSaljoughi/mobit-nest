import { UsersService } from './../users/users.service';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [ProductsController],
  providers: [ProductsService, UsersService, AuthGuard, RoleGuard],
})
export class ProductsModule {}
