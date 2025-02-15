import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async getInfo(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async findByPhone(phone: string) {
    return await this.prisma.user.findUnique({
      where: {
        phone: phone,
      },
    });
  }
}
