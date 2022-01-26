import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  NotificationsRepository,
  OrdersRepository,
} from '@pasnik/nestjs/database';

import { OrderStatusChangedListener } from './listeners';
import { NotificationsController } from './notifications.controller';
import { NotificationService } from './notifications.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersRepository, NotificationsRepository]),
  ],
  controllers: [NotificationsController],
  providers: [OrderStatusChangedListener, NotificationService],
  exports: [NotificationService],
})
export class NotificationsModule {}
