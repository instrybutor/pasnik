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
      .leftJoin(
        'dish_expense_share.workspaceUser',
        'workspace_user',
        'workspace_user.id = dish_expense_share.workspaceUserId'
      )
      .andWhere(
        new Brackets((db) => {
          db.where('workspace_user.userId = :userId');
        })
      )
      .setParameters({ userId: user.id })
      .getMany();
  }

  findAllInactiveForUser(user: UserEntity) {
    return (
      this.ordersRepository
        .findAllInactive()
        // .andWhere(
        //   new Brackets((db) => {
        //     db.where('dish.userId = :userId').orWhere('order.userId = :userId');
        //   })
        // )
        .setParameters({ userId: user.id })
        .getMany()
    );
  }
}
