import { RoleGuard } from './../role/role.guard';
import { AuthGuard } from './../auth/auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('info')
  @UseGuards(AuthGuard)
  getInfo(@Request() req: TUserRequestId) {
    return this.usersService.getInfo(req.user.id);
  }

  @Patch('info')
  @UseGuards(AuthGuard)
  updateInfo(
    @Request() req: TUserRequestId,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.updateInfo(req.user.id, updateUserDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RoleGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RoleGuard)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
