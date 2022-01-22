import {
  NotificationType,
  OrderStatusChangedDto,
} from '@pasnik/api/data-transfer';
import { BaseEvent } from './base.event';

export const EventName = 'order.status.changed';

export class OrderStatusChangedEvent extends BaseEvent {
  target = {
    browser: true,
    inApp: true,
  };
  action = NotificationType.OrderStatusChanged;
  data: OrderStatusChangedDto;
}
