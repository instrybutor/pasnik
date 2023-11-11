import { DateFormat, Header, ModalButton, UserName } from '@pasnik/components';
import { OrderStatusBadge, useCurrentOrder } from '@pasnik/features/orders';
import { OrderHeaderActions } from './order-header-actions';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { useCurrentWorkspace } from '@pasnik/features/workspaces';
import { OrderTimelineModal } from '../order-timeline-modal/order-timeline-modal';

export function OrderHeader() {
  const { t } = useTranslation();
  const { order } = useCurrentOrder();
  const { data: workspace } = useCurrentWorkspace();
  const latestAction = useMemo(() => {
    if (!order?.actions) {
      return null;
    }
    return order.actions[order.actions.length - 1];
  }, [order?.actions]);
  return (
    <Header
      className="bg-white shadow"
      left={
        <>
          <h1 className="text-2xl font-normal leading-7 text-gray-900 sm:leading-9 sm:truncate flex items-center gap-2">
            {order?.operation.name}
            {order?.menuUrl && (
              <a
                href={order.menuUrl}
                rel="noreferrer"
                target="_blank"
                className="inline-flex items-center p-0.5 border border-transparent rounded-full shadow-sm text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
              >
                <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            {order ? (
              <div className="inline-flex">
                <ModalButton
                  modal={<OrderTimelineModal order={order} />}
                  color="none"
                >
                  <OrderStatusBadge order={order} />
                </ModalButton>
              </div>
            ) : null}
          </h1>
          {latestAction && order && (
            <span className="text-sm font-medium text-gray-500">
              {t(`order.timeline.${latestAction.action}`)}{' '}
              {t(`order.timeline.by`)}{' '}
              <UserName className="text-gray-900" user={latestAction.user} />{' '}
              <DateFormat date={latestAction.createdAt} format="LLL" /> w{' '}
              <NavLink
                className="text-gray-900"
                to={`/workspace/${workspace?.slug}`}
              >
                {workspace?.name}
              </NavLink>
            </span>
          )}
        </>
      }
      right={<OrderHeaderActions />}
    />
  );
}
