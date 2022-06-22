import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export interface OrderStatusBadgeProps {
  order: OrderModel;
}

export function OrderStatusBadge({ order }: OrderStatusBadgeProps) {
  const { t } = useTranslation();
  return (
    <p
      className={classNames(
        'px-2 inline-flex text-xs leading-5 font-normal rounded-full',
        {
          'bg-green-100 text-green-800':
            order.status === OrderStatus.InProgress,
          'bg-gray-200 text-gray-800': order.status === OrderStatus.Delivered,
          'bg-yellow-100 text-yellow-800': [
            OrderStatus.Ordered,
            OrderStatus.Processing,
          ].includes(order.status),
          'bg-red-100 text-red-800': order.status === OrderStatus.Canceled,
        }
      )}
    >
      {t(`orderStatus.${order.status}`)}
    </p>
  );
}
