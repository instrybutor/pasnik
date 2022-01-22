import { EntityRepository, Repository } from 'typeorm';
import { NotificationAction } from '@pasnik/api/data-transfer';

import { UserEntity } from '../entities';
import { NotificationEntity } from '../entities/notification.entity';

@EntityRepository(NotificationEntity)
export class NotificationsRepository extends Repository<NotificationEntity> {
  async createNotification<T = unknown>(
    data: T,
    action: NotificationAction,
    users: UserEntity[]
  ) {
    const notification = new NotificationEntity();

    notification.data = data;
    notification.action = action;
    notification.users = users;

    await this.manager.save(notification);
  }

  async findAllByUserId(userId: number) {
    return this.createQueryBuilder('notification')
      .leftJoinAndMapOne(
        'notification.users',
        UserEntity,
        'user',
        `user.id = ${userId}`
      )
      .orderBy('notification.createdAt', 'DESC')
      .limit(10)
      .getMany();
  }
}
