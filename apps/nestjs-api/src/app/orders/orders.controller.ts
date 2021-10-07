import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserEntity } from '../entities/user.entity';
import { CreateOrderDto, MarkAsOrderedDto } from '@pasnik/api/data-transfer';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.ordersService.create(createOrderDto, user);
  }

  @Post(':id/mark-as-ordered')
  markAsOrdered(
    @Param('id') id,
    @Body() markAsOrderedDto: MarkAsOrderedDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.ordersService.markAsOrdered(id, markAsOrderedDto, user);
  }

  @Post(':id/mark-as-closed')
  markAsClosed(
    @Param('id') id,
    @CurrentUser() user: UserEntity,
  ) {
    return this.ordersService.markAsClosed(id, user);
  }

  @Post(':id/mark-as-open')
  markAsOpened(
    @Param('id') id,
    @CurrentUser() user: UserEntity,
  ) {
    return this.ordersService.markAsOpen(id, user);
  }
}
