import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DishEntity, OrderActionEntity } from '@pasnik/nestjs/database';
import { OrdersRepository } from '../repositories/orders.repository';
import { UsersRepository } from '../repositories/users.repository';

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
