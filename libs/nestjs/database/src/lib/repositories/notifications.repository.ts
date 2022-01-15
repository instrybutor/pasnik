import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from '../entities';
import { NotificationEntity } from '../entities/notification.entity';

@EntityRepository(NotificationEntity)
export class NotificationsRepository extends Repository<NotificationEntity> {
  async createNotification<T>(data: T, users: UserEntity[]) {
    const notification = new NotificationEntity();

    notification.users = users;

    return this.save(notification);
  }
}
