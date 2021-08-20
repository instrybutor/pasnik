import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DishEntity } from '../entities/dish.entity';
import { UserEntity } from '../entities/user.entity';
import { UserDishEntity } from '../entities/user-dish.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      DishEntity,
      UserDishEntity,
      UserEntity,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
