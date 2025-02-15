import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data });
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findBySlug(slug: string) {
    return await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async updateBySlug(
    slug: string,
    updateProductDto: Prisma.ProductUpdateInput,
  ) {
    return await this.prisma.product.update({
      where: {
        slug,
      },
      data: updateProductDto,
    });
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return await this.prisma.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
