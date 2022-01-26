import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatusChangedDto } from '@pasnik/api/data-transfer';

import {
  NotificationsRepository,
  OrdersRepository,
} from '@pasnik/nestjs/database';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationsRepository)
    private notificationRepository: NotificationsRepository,
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository
  ) {}

  async create(orderStatusChangedDto: OrderStatusChangedDto, action) {
    const order = await this.ordersRepository.findOneWithParticipants(
      orderStatusChangedDto.id
    );

    if (!order.participants.length) {
      return;
    }

    await this.notificationRepository.createNotification<OrderStatusChangedDto>(
      orderStatusChangedDto,
      action,
      order.participants
    );
  }

  async getNotifications(userId: number) {
    return this.notificationRepository.findAllByUserId(userId);
  }
}
