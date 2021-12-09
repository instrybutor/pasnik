import { Body, Controller, Get, Post, Put } from '@nestjs/common';

import { OrderEntity, UserEntity } from '@pasnik/nestjs/database';
import {
  MarkAsDeliveredDto,
  MarkAsOrderedDto,
  SetPayerDto,
  UpdateOrderDto,
} from '@pasnik/api/data-transfer';
import { CurrentUser } from '@pasnik/nestjs/auth';

import { OrderService } from './order.service';
import { CurrentOrder } from './current-order.decorator';

@Controller('orders/slug/:slug')
export class OrderController {
  constructor(private readonly ordersService: OrderService) {}

  @Get()
  findOne(@CurrentOrder() order: OrderEntity) {
    return this.ordersService.findOneById(order.id);
  }

  @Put()
  update(@CurrentOrder() order: OrderEntity, @Body() payload: UpdateOrderDto) {
    return this.ordersService.update(order, payload);
  }

  @Post('/mark-as-ordered')
  markAsOrdered(
    @CurrentOrder() order: OrderEntity,
    @Body() markAsOrderedDto: MarkAsOrderedDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.ordersService.markAsOrdered(order.id, markAsOrderedDto, user);
  }

  @Post('/mark-as-closed')
  markAsClosed(
    @CurrentOrder() order: OrderEntity,
    @CurrentUser() user: UserEntity
  ) {
    return this.ordersService.markAsClosed(order.id, user);
  }

  @Post('/mark-as-open')
  markAsOpened(
    @CurrentOrder() order: OrderEntity,
    @CurrentUser() user: UserEntity
  ) {
    return this.ordersService.markAsOpen(order.id, user);
  }

  @Post('/set-payer')
  markAsPaid(
    @CurrentOrder() order: OrderEntity,
    @Body() setPayerDto: SetPayerDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.ordersService.setPayer(order.id, setPayerDto, user);
  }

  @Post('/mark-as-delivered')
  markAsDelivered(
    @CurrentOrder() order: OrderEntity,
    @Body() markAsDeliveredDto: MarkAsDeliveredDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.ordersService.markAsDelivered(
      order.id,
      markAsDeliveredDto,
      user
    );
  }
}
