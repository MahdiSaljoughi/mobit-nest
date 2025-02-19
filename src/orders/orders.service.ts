import { PrismaService } from './../prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
        customer: true,
        products: {
          include: {
            product: {
              select: {
                title: true,
                slug: true,
              },
            },
          },
        },
      },
    });
  }

  async findAllOrderUser(id: number) {
    return await this.prisma.order.findMany({
      where: {
        customer_id: id,
      },
      include: {
        products: {
          include: {
            product: {
              select: {
                title: true,
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

  async update(id: number, updateOrderDto: Prisma.OrderUpdateInput) {
    return await this.prisma.order.update({
      where: {
        id,
      },
      data: updateOrderDto,
    });
  }

  async canceleOrder(id: number, userId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id, customer_id: userId },
      select: { status: true },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status === 'CANCELED') {
      throw new BadRequestException('Order is already canceled');
    }

    if (order.status === 'DELIVERED') {
      throw new BadRequestException('Delivered orders cannot be canceled');
    }

    return await this.prisma.order.update({
      where: { id, customer_id: userId },
      data: { status: 'CANCELED' },
    });
  }

  async remove(id: number) {
    return await this.prisma.order.delete({
      where: {
        id,
      },
    });
  }

  async createProductOrder(
    createOrderDto: Prisma.ProductOrderCreateManyInput[],
  ) {
    return await this.prisma.productOrder.createMany({
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
