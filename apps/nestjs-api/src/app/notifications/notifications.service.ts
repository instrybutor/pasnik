import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  NotificationsRepository,
  OrdersRepository,
} from '@pasnik/nestjs/database';
import { OrderStatusChangedDto } from './dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationsRepository)
    private notificationRepository: NotificationsRepository,
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository
  ) {}

  async create(orderId: string, orderStatusChangedDto: OrderStatusChangedDto) {
    const order = await this.ordersRepository.findOneOrFail(orderId);

    return this.notificationRepository.createNotification<OrderStatusChangedDto>(
      orderStatusChangedDto,
      order.participants
    );
  }
}
