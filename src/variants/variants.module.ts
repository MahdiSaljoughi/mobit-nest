import { UsersService } from './../users/users.service';
import { AuthGuard } from './../auth/auth.guard';
import { RoleGuard } from './../role/role.guard';
import { Module } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { VariantsController } from './variants.controller';

@Module({
  controllers: [VariantsController],
  providers: [VariantsService, UsersService, RoleGuard, AuthGuard],
})
export class VariantsModule {}
