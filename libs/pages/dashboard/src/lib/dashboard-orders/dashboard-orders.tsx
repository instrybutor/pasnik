import { useDashboardStore } from '../dashboard-store/dashboard.store';
import { Spinner } from '@pasnik/components';
import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import { DashboardOrderList } from '../dashboard-order-list/dashboard-order-list';
import { OrdersEmpty } from '@pasnik/features/orders';

/* eslint-disable-next-line */
export interface DashboardOrdersProps {}

const sortOrder = (order: OrderModel, nextOrder: OrderModel) =>
  new Date(order.createdAt).getTime() > new Date(nextOrder.createdAt).getTime()
    ? -1
    : 1;

const getActiveOrder = (orders: OrderModel[]) =>
  orders
    .filter((order) =>
      [OrderStatus.InProgress, OrderStatus.Ordered].includes(order.status)
    )
    .sort(sortOrder);

const getArchivedOrders = (orders: OrderModel[]) =>
  orders
    .filter((order) =>
      [OrderStatus.Delivered, OrderStatus.Canceled].includes(order.status)
    )
    .sort(sortOrder);

export function DashboardOrders(props: DashboardOrdersProps) {
  const { activeOrders, archivedOrders } = useDashboardStore((state) => ({
    activeOrders: getActiveOrder(Object.values(state.entities ?? {})),
    archivedOrders: getArchivedOrders(Object.values(state.entities ?? {})),
  }));
  const isFetching = useDashboardStore((state) => state.isFetching);
  return (
    <>
      <h2 className="max-w-6xl mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
        Twoje zamówienia
      </h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md mt-2">
        <div className="border-b border-gray-200">
          {isFetching ? (
            <Spinner />
          ) : activeOrders.length ? (
            <DashboardOrderList orders={activeOrders} />
          ) : (
            <OrdersEmpty />
          )}
        </div>
      </div>

      {archivedOrders.length !== 0 && (
        <>
          <h2 className="max-w-6xl mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
            Ostatnio zamkniete zamówienia ({'<'}24h)
          </h2>

          <div className="bg-white shadow overflow-hidden sm:rounded-md mt-2">
            <div className="border-b border-gray-200">
              <ul className="divide-y divide-gray-200">
                {archivedOrders.map((order) => (
                  <DashboardOrderList orders={archivedOrders} />
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DashboardOrders;
