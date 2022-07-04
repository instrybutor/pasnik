import { OrderSection } from '../order-section/order-section';
import { useCurrentOrder } from '@pasnik/features/orders';
import { OrderEta } from './order-eta';

export function OrderETASection() {
  const { order } = useCurrentOrder();
  return (
    <OrderSection header="Oczekiwanie na dostawę">
      {order ? <OrderEta order={order} /> : null}
    </OrderSection>
  );
}
