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
import { CurrentAbility } from '../app-ability';
import { AppAbility, OrdersAction } from '@pasnik/ability';
import { ForbiddenError } from '@casl/ability';

@Controller('orders/slug/:slug')
export class OrderController {
  constructor(private readonly ordersService: OrderService) {}

  @Get()
  findOne(
    @CurrentOrder() order: OrderEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(OrdersAction.Read, order);

    return this.ordersService.findOneById(order.id);
  }

  @Put()
  update(
    @CurrentOrder() order: OrderEntity,
    @Body() payload: UpdateOrderDto,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(OrdersAction.Update, order);
    return this.ordersService.update(order, payload);
  }

  @Post('/mark-as-ordered')
  markAsOrdered(
    @CurrentOrder() order: OrderEntity,
    @Body() markAsOrderedDto: MarkAsOrderedDto,
    @CurrentUser() user: UserEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      OrdersAction.MarkAsOrdered,
      order
    );
    return this.ordersService.markAsOrdered(order.id, markAsOrderedDto, user);
  }

  @Post('/mark-as-closed')
  markAsClosed(
    @CurrentOrder() order: OrderEntity,
    @CurrentUser() user: UserEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      OrdersAction.MarkAsClosed,
      order
    );
    return this.ordersService.markAsClosed(order.id, user);
  }

  @Post('/mark-as-open')
  markAsOpen(
    @CurrentOrder() order: OrderEntity,
    @CurrentUser() user: UserEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(OrdersAction.MarkAsOpen, order);
    return this.ordersService.markAsOpen(order.id, user);
  }

  @Post('/set-payer')
  markAsPaid(
    @CurrentOrder() order: OrderEntity,
    @Body() setPayerDto: SetPayerDto,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(OrdersAction.SetPayer, order);
    return this.ordersService.setPayer(order.id, setPayerDto);
  }

  @Post('/mark-as-delivered')
  markAsDelivered(
    @CurrentOrder() order: OrderEntity,
    @CurrentUser() user: UserEntity,
    @CurrentAbility() ability: AppAbility,
    @Body() markAsDeliveredDto: MarkAsDeliveredDto
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      OrdersAction.MarkAsDelivered,
      order
    );
    return this.ordersService.markAsDelivered(
      order.id,
      markAsDeliveredDto,
      user
    );
  }
}
