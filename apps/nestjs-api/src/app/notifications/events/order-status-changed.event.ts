import { OrderStatusChangedDto } from '../dto';

export const EventName = 'order.status.changed';

export class OrderStatusChangedEvent {
  protected readonly target = {
    browser: true,
    inApp: true,
  };
  order: OrderStatusChangedDto;
}
