import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import {
  OrderStatusChangedEvent,
  EventName,
} from '../events/order-status-changed.event';
import { NotificationService } from '../notifications.service';

@Injectable()
export class OrderStatusChangedListener {
  constructor(private notificationService: NotificationService) {}

  @OnEvent(EventName)
  handleOrderStatusChangedEvent(event: OrderStatusChangedEvent) {
    this.notificationService.create(event.data, event.action);
  }
}
