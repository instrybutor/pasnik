import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserEntity } from '../entities/user.entity';
import { CreateOrderDto, FindOrderDto } from '@pasnik/api/data-transfer';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get()
  findOne(@Body() findOrderDto: FindOrderDto) {
    return this.ordersService.findOne(findOrderDto.id);
  }

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.ordersService.create(createOrderDto, user);
  }
}
