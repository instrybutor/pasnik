import { DateDistance, DateFormat } from '@pasnik/components';
import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';

export interface OrderTimestampProps {
  order: OrderModel;
}

export function OrderTimestamp({ order }: OrderTimestampProps) {
  return (
    <p>
      {order.status === OrderStatus.InProgress && (
        <>
          Utworzone <DateDistance date={order.createdAt} />
        </>
      )}
      {order.status === OrderStatus.Ordered && (
        <>
          Zamówione <DateDistance date={order.orderedAt} />
        </>
      )}
      {order.status === OrderStatus.Delivered && (
        <>
          Dostarczone{' '}
          <DateFormat date={order.deliveredAt} format="MM/dd/yyyy" />
        </>
      )}
    </p>
  );
}
