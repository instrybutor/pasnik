import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { OrdersRepository, UserEntity } from '@pasnik/nestjs/database';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository
  ) {}

  findAllActiveForUser(user: UserEntity) {
    return this.ordersRepository
      .findAllActive(true)
      .andWhere('dish.userId = :userId', { userId: user.id })
      .getMany();
  }

  findAllInactiveForUser(user: UserEntity) {
    return this.ordersRepository
      .findAllInactive()
      .andWhere('dish.userId = :userId', { userId: user.id })
      .getMany();
  }
}
