import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { OrdersRepository, UserEntity } from '@pasnik/nestjs/database';
import { OrderStatus } from '@pasnik/api/data-transfer';
import { Brackets } from 'typeorm';
import { sub } from 'date-fns';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository
  ) {}

  findAllActiveForUser(user: UserEntity) {
    const now = new Date();
    const yesterday = sub(now, { days: 1 });

    return this.ordersRepository
      .createQueryBuilder('order')
      .leftJoin('order.dishes', 'dish', 'dish.userId = :userId')
      .leftJoinAndMapOne(
        'order.user',
        UserEntity,
        'user',
        'user.id = order.userId'
      )
      .leftJoinAndMapMany(
        'order.participants',
        UserEntity,
        'participant',
        'dish.userId = participant.id'
      )
      .where('order.userId = :userId')
      .andWhere(
        new Brackets((db) => {
          db.where(`order.status = '${OrderStatus.InProgress}'`)
            .orWhere(`order.status = '${OrderStatus.Ordered}'`)
            .orWhere(
              `(order.status = '${OrderStatus.Delivered}' AND order.deliveredAt BETWEEN :startDate AND :endDate)`
            );
        })
      )
      .addSelect('SUM(dish.priceCents)', 'order_totalPrice')
      .groupBy('order.id')
      .addGroupBy('user.id')
      .addGroupBy('participant.id')
      .setParameters({
        userId: user.id,
        startDate: yesterday,
        endDate: now,
      })
      .getMany();
  }

  findAllInactiveForUser(user: UserEntity) {
    return this.ordersRepository.find({
      where: [
        { status: OrderStatus.Delivered, user },
        { status: OrderStatus.Canceled, user },
      ],
      relations: ['user'],
    });
  }
}
