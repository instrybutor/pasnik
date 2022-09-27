import { useTranslation } from 'react-i18next';
import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import { DashboardOrderList } from '../dashboard-order-list/dashboard-order-list';
import { OrdersEmpty, useActiveOrders } from '@pasnik/features/orders';
import { useCurrentWorkspace } from '@pasnik/features/workspaces';
import { DashboardOrdersSkeleton } from './dashboard-orders-skeleton';
import { useMemo } from 'react';

const sortOrder = (order: OrderModel, nextOrder: OrderModel) =>
  new Date(order.createdAt).getTime() > new Date(nextOrder.createdAt).getTime()
    ? -1
    : 1;

const getActiveOrder = (orders: OrderModel[]) =>
  orders
    .filter((order) =>
      [
        OrderStatus.InProgress,
        OrderStatus.Ordered,
        OrderStatus.Processing,
      ].includes(order.status)
    )
    .sort(sortOrder);

const getArchivedOrders = (orders: OrderModel[]) =>
  orders
    .filter((order) =>
      [OrderStatus.Delivered, OrderStatus.Canceled].includes(order.status)
    )
    .sort(sortOrder);

export function DashboardOrders() {
  const { t } = useTranslation();
  const { data: orders } = useActiveOrders();
  const { data: workspace } = useCurrentWorkspace();
  const { activeOrders, archivedOrders } = useMemo(
    () => ({
      activeOrders: getActiveOrder(orders ?? []),
      archivedOrders: getArchivedOrders(orders ?? []),
    }),
    [orders]
  );

  return (
    <>
      <h2 className="max-w-6xl mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
        {t('dashboard.active_orders')}
      </h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md mt-2">
        <div className="border-b border-gray-200">
          {activeOrders.length ? (
            <DashboardOrderList orders={activeOrders} />
          ) : (
            <OrdersEmpty workspace={workspace} />
          )}
        </div>
      </div>

      {archivedOrders.length !== 0 && (
        <>
          <h2 className="max-w-6xl mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
            {t('dashboard.closed_orders')}
          </h2>

          <div className="bg-white shadow overflow-hidden sm:rounded-md mt-2">
            <div className="border-b border-gray-200">
              <ul className="divide-y divide-gray-200">
                {archivedOrders.map((order) => (
                  <DashboardOrderList
                    key={order.slug}
                    orders={archivedOrders}
                  />
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

DashboardOrders.Skeleton = DashboardOrdersSkeleton;
