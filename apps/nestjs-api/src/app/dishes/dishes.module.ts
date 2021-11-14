import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersRepository } from '@pasnik/nestjs/database';

import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { OrdersRepository } from '../repositories/orders.repository';
import { DishesRepository } from '../repositories/dishes.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersRepository,
      DishesRepository,
      UsersRepository,
    ]),
  ],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {}
