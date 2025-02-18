import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: Prisma.OrderCreateInput) {
    return await this.prisma.order.create({
      data: createOrderDto,
    });
  }

  async findAll() {
    return await this.prisma.order.findMany({
      orderBy: { id: 'asc' },
      include: {
        products: {
          include: {
            product: {
              select: {
                title: true,
                title_eng: true,
                slug: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number, user_id: number) {
    return await this.prisma.order.findUnique({
      where: {
        id,
        customer_id: user_id,
      },
      include: {
        products: {
          include: {
            product: {
              select: {
                title: true,
                title_eng: true,
                slug: true,
                images: true,
                variants: true,
              },
            },
          },
        },
        customer: true,
      },
    });
  }

  async update(
    id: number,
    user_id: number,
    updateOrderDto: Prisma.OrderUpdateInput,
  ) {
    return await this.prisma.order.update({
      where: {
        id,
        customer_id: user_id,
      },
      data: updateOrderDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.order.delete({
      where: {
        id,
      },
    });
  }

  async createProductOrder(createOrderDto: Prisma.ProductOrderCreateInput) {
    return await this.prisma.productOrder.create({
      data: createOrderDto,
    });
  }

  async findAllProductOrder() {
    return await this.prisma.productOrder.findMany({
      orderBy: { id: 'asc' },
      include: {
        product: {
          select: { title: true, title_eng: true, slug: true },
        },
      },
    });
  }

  async findOneProductOrder(id: number) {
    return await this.prisma.productOrder.findUnique({
      where: {
        id,
      },
      include: {
        product: {
          include: {
            images: true,
            variants: true,
            author: true,
          },
        },
      },
    });
  }

  async updateProductOrder(
    id: number,
    updateOrderDto: Prisma.ProductOrderUpdateInput,
  ) {
    return await this.prisma.productOrder.update({
      where: {
        id,
      },
      data: updateOrderDto,
    });
  }

  async removeProductOrder(id: number) {
    return await this.prisma.productOrder.delete({
      where: {
        id,
      },
    });
  }
}
