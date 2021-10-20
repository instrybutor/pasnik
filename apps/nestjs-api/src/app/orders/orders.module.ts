import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DishEntity } from '../entities/dish.entity';
import { OrdersRepository } from '../repositories/orders.repository';
import { OrderActionEntity } from '../entities/order-action.entity';
import { UsersRepository } from '../repositories/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersRepository,
      OrderActionEntity,
      DishEntity,
      UsersRepository
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
