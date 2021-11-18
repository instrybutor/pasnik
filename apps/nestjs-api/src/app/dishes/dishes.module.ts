import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  DishesRepository,
  OrdersRepository,
  UsersRepository,
} from '@pasnik/nestjs/database';

import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';

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
