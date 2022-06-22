import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CurrentUser } from '@pasnik/nestjs/auth';
import { OrderEntity, UserEntity } from '@pasnik/nestjs/database';
import { AddDishDto } from '@pasnik/api/data-transfer';

import { DishesService } from './dishes.service';
import { CurrentOrder } from '../order/current-order.decorator';
import { CurrentAbility } from '../app-ability';
import { AppAbility, OrdersAction } from '@pasnik/ability';
import { ForbiddenError } from '@casl/ability';

@Controller('orders/slug/:slug/dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get()
  findAll(@CurrentOrder() order: OrderEntity) {
    return this.dishesService.findAll(order);
  }

  @Get(':id')
  findOne(@CurrentOrder() order: OrderEntity, @Param('id') id: string) {
    return this.dishesService.findOne(order, +id);
  }

  @Post()
  create(
    @CurrentOrder() order: OrderEntity,
    @Body() addDishDto: AddDishDto,
    @CurrentUser() currentUser: UserEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(OrdersAction.CreateDish, order);
    return this.dishesService.create(addDishDto, order, currentUser);
  }

  @Delete(':id')
  delete(
    @CurrentOrder() order: OrderEntity,
    @Param('id') id: string,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(OrdersAction.DeleteDish, order);
    return this.dishesService.delete(order, +id);
  }

  @Put(':id')
  update(
    @CurrentOrder() order: OrderEntity,
    @Body() addDishDto: AddDishDto,
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(OrdersAction.UpdateDish, order);
    return this.dishesService.update(order, +id, addDishDto, user);
  }
}
