import { DateDistance, DateFormat } from '@pasnik/components';
import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import { t } from 'i18next';

export interface OrderTimestampProps {
  order: OrderModel;
  showLabel?: boolean;
}

export function OrderTimestamp({ order, showLabel }: OrderTimestampProps) {
  return (
    <p>
      {order.status === OrderStatus.InProgress && (
        <>
          {showLabel && <span>{t('timestamp.created')} </span>}
          <DateDistance date={order.createdAt} />
        </>
      )}
      {order.status === OrderStatus.Ordered && (
        <>
          {showLabel && <span>{t('timestamp.ordered')} </span>}
          <DateDistance date={order.orderedAt} />
        </>
      )}
      {order.status === OrderStatus.Delivered && (
        <>
          {showLabel && <span>{t('timestamp.delivered')} </span>}
          <DateFormat date={order.deliveredAt} format="MM/dd/yyyy HH:mm" />
        </>
      )}
      {order.status === OrderStatus.Canceled && (
        <>
          {showLabel && <span>{t('timestamp.canceled')} </span>}
          <DateFormat date={order.updatedAt} format="MM/dd/yyyy HH:mm" />
        </>
      )}
    </p>
  );
}
