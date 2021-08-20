import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserEntity } from '../entities/user.entity';
import { CreateOrderDto } from '@pasnik/api/data-transfer';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  create(
    @CurrentUser() user: UserEntity,
    @Body() createOrderDto: CreateOrderDto
  ) {
    return this.ordersService.create(createOrderDto, user);
  }
}
