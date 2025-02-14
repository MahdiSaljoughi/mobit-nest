import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userCreate = await this.prisma.user.create({
      data: createUserDto,
    });

    return userCreate;
  }

  async findAll() {
    const allUsers = await this.prisma.user.findMany();

    return allUsers;
  }

  async findOne(id: number) {
    const userFindOne = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return userFindOne;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userUpdate = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });

    return userUpdate;
  }

  async remove(id: number) {
    const userRemove = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    return userRemove;
  }
}
