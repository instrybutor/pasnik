import { OrderStatus } from '../../models';

export interface OrderStatusChangedDto {
  id: string;
  from: string;
  slug: string;
  status: OrderStatus;
}
