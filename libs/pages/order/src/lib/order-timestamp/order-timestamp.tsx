import { DateDistance, DateFormat } from '@pasnik/components';
import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';

export interface OrderTimestampProps {
  order: OrderModel;
  showLabel?: boolean;
}

export function OrderTimestamp({ order, showLabel }: OrderTimestampProps) {
  return (
    <p>
      {order.status === OrderStatus.InProgress && (
        <>
          {showLabel && <span>Utworzone </span>}
          <DateDistance date={order.createdAt} />
        </>
      )}
      {order.status === OrderStatus.Ordered && (
        <>
          {showLabel && <span>Zamowiono </span>}
          <DateDistance date={order.orderedAt} />
        </>
      )}
      {order.status === OrderStatus.Delivered && (
        <>
          {showLabel && <span>Dostarczono </span>}
          <DateFormat date={order.deliveredAt} format="MM/dd/yyyy HH:mm" />
        </>
      )}
      {order.status === OrderStatus.Canceled && (
        <>
          {showLabel && <span>Usunięto </span>}
          <DateFormat date={order.updatedAt} format="MM/dd/yyyy HH:mm" />
        </>
      )}
    </p>
  );
}
