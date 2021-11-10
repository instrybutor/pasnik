import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DishEntity,
  OrderActionEntity,
  UsersRepository,
} from '@pasnik/nestjs/database';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from '../repositories/orders.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersRepository,
      OrderActionEntity,
      DishEntity,
      UsersRepository,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
