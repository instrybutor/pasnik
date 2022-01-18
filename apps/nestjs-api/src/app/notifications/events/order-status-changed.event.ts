import {
  NotificationType,
  OrderStatusChangedDto,
} from '@pasnik/api/data-transfer';

export const EventName = 'order.status.changed';

export class OrderStatusChangedEvent {
  protected readonly target = {
    browser: true,
    inApp: true,
  };
  action = NotificationType.STATUS_CHANGED;
  data: OrderStatusChangedDto;
}
