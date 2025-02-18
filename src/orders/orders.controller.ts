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
import { OrdersService } from './orders.service';
import { Prisma } from '@prisma/client';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: Prisma.OrderCreateInput) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('products')
  @UseGuards(AuthGuard, RoleGuard)
  findAllProductOrder() {
    return this.ordersService.findAllProductOrder();
  }

  @Get('products/:id')
  @UseGuards(AuthGuard, RoleGuard)
  findOneProductOrder(@Param('id') id: string) {
    return this.ordersService.findOneProductOrder(+id);
  }

  @Post('products')
  createProductOrder(@Body() createOrderDto: Prisma.ProductOrderCreateInput) {
    return this.ordersService.createProductOrder(createOrderDto);
  }

  @Patch('products/:id')
  @UseGuards(AuthGuard, RoleGuard)
  updateProductOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: Prisma.ProductOrderUpdateInput,
  ) {
    return this.ordersService.updateProductOrder(+id, updateOrderDto);
  }

  @Delete('products/:id')
  @UseGuards(AuthGuard, RoleGuard)
  removeProductOrder(@Param('id') id: string) {
    return this.ordersService.removeProductOrder(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: UserRequestId) {
    return this.ordersService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req: UserRequestId,
    @Body() updateOrderDto: Prisma.OrderUpdateInput,
  ) {
    return this.ordersService.update(+id, req.user.id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
