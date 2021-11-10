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
import { UserEntity } from '@pasnik/nestjs/database';
import { AddDishDto } from '@pasnik/api/data-transfer';

import { DishesService } from './dishes.service';

@Controller('api/orders/:orderId/dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get()
  findAll(@Param('orderId') orderId: string) {
    return this.dishesService.findAll(orderId);
  }

  @Get(':id')
  findOne(@Param('orderId') orderId: string, @Param('id') id: string) {
    return this.dishesService.findOne(orderId, +id);
  }

  @Post()
  create(
    @Param('orderId') orderId: string,
    @Body() addDishDto: AddDishDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.dishesService.create(addDishDto, orderId, user);
  }

  @Delete(':id')
  delete(@Param('orderId') orderId: string, @Param('id') id: string) {
    return this.dishesService.delete(orderId, +id);
  }

  @Put(':id')
  update(
    @Param('orderId') orderId: string,
    @Body() addDishDto: AddDishDto,
    @Param('id') id: string
  ) {
    return this.dishesService.update(orderId, +id, addDishDto);
  }
}
