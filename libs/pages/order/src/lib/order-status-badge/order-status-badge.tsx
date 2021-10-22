import {
  getOrderStatus,
  OrderModel,
  OrderStatus,
} from '@pasnik/api/data-transfer';
import classNames from 'classnames';

export interface OrderStatusBadgeProps {
  order: OrderModel;
}

export function OrderStatusBadge({ order }: OrderStatusBadgeProps) {
  return (
    <p
      className={classNames(
        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
        {
          'bg-green-100 text-green-800':
            order.status === OrderStatus.InProgress,
          'bg-gray-200 text-gray-800': order.status === OrderStatus.Delivered,
          'bg-yellow-100 text-yellow-800': order.status === OrderStatus.Ordered,
          'bg-red-100 text-red-800': order.status === OrderStatus.Canceled,
        }
      )}
    >
      {getOrderStatus(order)}
    </p>
  );
}
