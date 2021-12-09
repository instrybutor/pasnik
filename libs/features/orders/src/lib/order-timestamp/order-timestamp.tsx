import { DateDistance, DateFormat } from '@pasnik/components';
import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import {
  BanIcon,
  CheckCircleIcon,
  DocumentAddIcon,
  TruckIcon,
} from '@heroicons/react/outline';
import { useTranslation } from 'react-i18next';

export interface OrderTimestampProps {
  order: OrderModel;
  showLabel?: boolean;
  showIcon?: boolean;
  iconClass?: string;
}

export function OrderTimestamp({
  order,
  showLabel,
  showIcon,
  iconClass,
}: OrderTimestampProps) {
  const { t } = useTranslation();
  const _iconClass = iconClass ?? 'flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400';
  return (
    <p className="flex items-center">
      {order.status === OrderStatus.InProgress && (
        <>
          {showIcon && <DocumentAddIcon className={_iconClass} />}
          {showLabel && <span>{t('timestamp.created')} </span>}
          <DateDistance date={order.createdAt} />
        </>
      )}
      {order.status === OrderStatus.Ordered && (
        <>
          {showIcon && <TruckIcon className={_iconClass} />}
          {showLabel && <span>{t('timestamp.ordered')} </span>}
          <DateDistance date={order.orderedAt} />
        </>
      )}
      {order.status === OrderStatus.Delivered && (
        <>
          {showIcon && <CheckCircleIcon className={_iconClass} />}
          {showLabel && <span>{t('timestamp.delivered')} </span>}
          <DateFormat date={order.deliveredAt} format="MM/dd/yyyy HH:mm" />
        </>
      )}
      {order.status === OrderStatus.Canceled && (
        <>
          {showIcon && <BanIcon className={_iconClass} />}
          {showLabel && <span>{t('timestamp.canceled')} </span>}
          <DateFormat date={order.updatedAt} format="MM/dd/yyyy HH:mm" />
        </>
      )}
    </p>
  );
}
