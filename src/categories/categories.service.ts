import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: Prisma.CategoryCreateInput) {
    return await this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return await this.prisma.category.findMany({
      include: {
        author: { select: { user_name: true } },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.category.findUnique({
      where: { id },
      include: {
        author: { select: { user_name: true } },
      },
    });
  }

  async update(id: number, updateCategoryDto: Prisma.CategoryUpdateInput) {
    return await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
