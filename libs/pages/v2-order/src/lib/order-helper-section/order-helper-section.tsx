import { OrderSection } from '../order-section/order-section';
import { OrderModel } from '@pasnik/api/data-transfer';

export interface OrderHelperSectionProps {
  order: OrderModel;
}

export function OrderHelperSection({ order }: OrderHelperSectionProps) {
  return <OrderSection header="Zamawianie" />;
}
