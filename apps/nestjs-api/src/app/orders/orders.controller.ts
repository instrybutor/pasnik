import { Controller, Get } from '@nestjs/common';

import { UserEntity } from '@pasnik/nestjs/database';
import { CurrentUser } from '@pasnik/nestjs/auth';

import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('active')
  findAllActive(@CurrentUser() user: UserEntity) {
    return this.ordersService.findAllActiveForUser(user);
  }

  @Get('inactive')
  findAllInactive(@CurrentUser() user: UserEntity) {
    return this.ordersService.findAllInactiveForUser(user);
  }
}
