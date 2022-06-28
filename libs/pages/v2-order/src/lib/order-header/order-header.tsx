import { OrderModel } from '@pasnik/api/data-transfer';
import { DateFormat, Header, UserName } from '@pasnik/components';
import { OrderStatusBadge } from '@pasnik/features/orders';
import { OrderHeaderActions } from '../order-header-actions/order-header-actions';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { ExternalLinkIcon } from '@heroicons/react/outline';

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
      className="bg-white shadow "
      left={
        <>
          <h1 className="text-2xl font-normal leading-7 text-gray-900 sm:leading-9 sm:truncate flex items-center gap-2">
            {order.from}
            {order.menuUrl && (
              <a
                href={order.menuUrl}
                rel="noreferrer"
                target="_blank"
                className="inline-flex items-center p-0.5 border border-transparent rounded-full shadow-sm text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
              >
                <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            <div className="inline-flex">
              <OrderStatusBadge order={order} />
            </div>
          </h1>
          {latestAction && (
            <p className="text-sm font-medium text-gray-500">
              {t(`v2-order.timeline.${latestAction.action}`)}{' '}
              {t(`v2-order.timeline.by`)}{' '}
              <UserName className="text-gray-900" user={latestAction.user} />{' '}
              <DateFormat date={latestAction.createdAt} format="LLL" /> w{' '}
              <NavLink
                className="text-gray-900"
                to={`/workspace/${order.workspace?.slug}`}
              >
                {order.workspace?.name}
              </NavLink>
            </p>
          )}
        </>
      }
      right={<OrderHeaderActions order={order} />}
    />
  );
}
