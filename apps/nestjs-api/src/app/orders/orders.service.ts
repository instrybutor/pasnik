import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { OrdersRepository, UserEntity } from '@pasnik/nestjs/database';
import { Brackets } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository
  ) {}

  findAllActiveForUser(user: UserEntity) {
    return this.ordersRepository
      .findAllActive(true)
      .andWhere(
        new Brackets((db) => {
          db.where('dish.userId = :userId')
            .orWhere('order.userId = :userId')
            .orWhere('order.payerId = :userId');
        })
      )
      .setParameters({ userId: user.id })
      .getMany();
  }

  findAllInactiveForUser(user: UserEntity) {
    return this.ordersRepository
      .findAllInactive()
      .andWhere(
        new Brackets((db) => {
          db.where('dish.userId = :userId')
            .orWhere('order.userId = :userId')
            .orWhere('order.payerId = :userId');
        })
      )
      .setParameters({ userId: user.id })
      .getMany();
  }
}
