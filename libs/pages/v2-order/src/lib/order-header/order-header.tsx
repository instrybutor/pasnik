import { OrderModel } from '@pasnik/api/data-transfer';
import { DateFormat, Header, UserName } from '@pasnik/components';
import { OrderStatusBadge } from '@pasnik/features/orders';
import { OrderHeaderActions } from '../order-header-actions/order-header-actions';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export interface OrderHeaderProps {
  order: OrderModel;
}

export function OrderHeader({ order }: OrderHeaderProps) {
  const { t } = useTranslation();
  const latestAction = useMemo(() => {
    if (!order.actions) {
      return null;
    }
    return order.actions[order.actions.length - 1];
  }, [order.actions]);
  return (
    <Header
      className="bg-white shadow"
      left={
        <>
          <h1 className="text-2xl font-normal leading-7 text-gray-900 sm:leading-9 sm:truncate flex items-center">
            {order.from}
            <div className="inline-flex ml-4">
              <OrderStatusBadge order={order} />
            </div>
          </h1>
          {latestAction && (
            <p className="text-sm font-medium text-gray-500">
              {t(`v2-order.timeline.${latestAction.action}`)}{' '}
              {t(`v2-order.timeline.by`)}{' '}
              <UserName className="text-gray-900" user={latestAction.user} />{' '}
              <DateFormat date={latestAction.createdAt} format="LLL" />
            </p>
          )}
        </>
      }
      right={<OrderHeaderActions order={order} />}
    />
  );
}
