import { AuthGuard } from './../auth/auth.guard';
import { RoleGuard } from './../role/role.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VariantsService } from './variants.service';
import { Prisma } from '@prisma/client';

@Controller('variants')
@UseGuards(AuthGuard, RoleGuard)
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {}

  @Post()
  create(@Body() createVariantDto: Prisma.ProductVariantCreateInput) {
    return this.variantsService.create(createVariantDto);
  }

  @Get()
  findAll() {
    return this.variantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVariantDto: Prisma.ProductVariantUpdateInput,
  ) {
    return this.variantsService.update(+id, updateVariantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantsService.remove(+id);
  }
}
