import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DishEntity } from '../entities/dish.entity';
import { UserEntity } from '../entities/user.entity';
import { UserDishEntity } from '../entities/user-dish.entity';
import { OrdersRepository } from '../repositories/orders.repository';
import { DishesRepository } from '../repositories/dishes.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersRepository,
      DishesRepository,
      DishEntity,
      UserDishEntity,
      UserEntity,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
