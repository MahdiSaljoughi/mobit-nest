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
  Request,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Prisma } from '@prisma/client';
import { Request as ExpressRequest } from 'express';

interface UserIdRequest extends ExpressRequest {
  user: {
    id: number;
  };
}

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  create(
    @Request() req: UserIdRequest,
    @Body() createCategoryDto: Omit<Prisma.CategoryCreateInput, 'created_by'>,
  ) {
    return this.categoriesService.create({
      ...createCategoryDto,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      created_by: req.user.id,
    });
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RoleGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: Prisma.CategoryUpdateInput,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
