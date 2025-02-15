import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class VariantsService {
  constructor(private prisma: PrismaService) {}

  async create(createVariantDto: Prisma.ProductVariantCreateInput) {
    return await this.prisma.productVariant.create({
      data: createVariantDto,
    });
  }

  async findAll() {
    return await this.prisma.productVariant.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.productVariant.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateVariantDto: Prisma.ProductVariantUpdateInput) {
    return await this.prisma.productVariant.update({
      where: {
        id,
      },
      data: updateVariantDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.productVariant.delete({
      where: {
        id,
      },
    });
  }
}
