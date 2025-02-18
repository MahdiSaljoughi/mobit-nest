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
  create(
    @Request() req: TUserRequestId,
    @Body() createOrderDto: Omit<Prisma.OrderCreateInput, 'customer_id'>,
  ) {
    return this.ordersService.create({
      ...createOrderDto,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      customer_id: req.user.id,
    });
  }

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('user')
  @UseGuards(AuthGuard)
  findAllOrderUser(@Request() req: TUserRequestId) {
    return this.ordersService.findAllOrderUser(Number(req.user.id));
  }

  @Patch('user/:id')
  canceleOrder(@Param('id') id: string, @Request() req: TUserRequestId) {
    return this.ordersService.canceleOrder(+id, req.user.id);
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
  createProductOrder(
    @Body() createOrderDto: Prisma.ProductOrderCreateManyInput[],
  ) {
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
  findOne(@Param('id') id: string, @Request() req: TUserRequestId) {
    return this.ordersService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: Prisma.OrderUpdateInput,
  ) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
