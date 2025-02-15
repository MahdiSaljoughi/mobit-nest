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
import { ProductsService } from './products.service';
import { Request as ExpressRequest } from 'express';
import { Prisma } from '@prisma/client';

interface UserIdRequest extends ExpressRequest {
  user: {
    id: number;
  };
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  create(
    @Request() req: UserIdRequest,
    @Body() createProductDto: Omit<Prisma.ProductCreateInput, 'created_by'>,
  ) {
    return this.productsService.create({
      ...createProductDto,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      created_by: req.user.id,
    });
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RoleGuard)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch('slug/:slug')
  @UseGuards(AuthGuard, RoleGuard)
  updateBySlug(
    @Param('slug') slug: string,
    @Body() updateProductDto: Prisma.ProductUpdateInput,
  ) {
    return this.productsService.updateBySlug(slug, updateProductDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RoleGuard)
  update(
    @Param('id') id: string,
    @Body() updateProductDto: Prisma.ProductUpdateInput,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
