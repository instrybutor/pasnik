import { useDashboardStore } from '../dashboard-store/dashboard.store';
import DashboardOrdersEmpty from '../dashboard-orders-empty/dashboard-orders-empty';
import DashboardOrdersItem from '../dashboard-orders-item/dashboard-orders-item';
import { Spinner } from '@pasnik/layout';
import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';

/* eslint-disable-next-line */
export interface DashboardOrdersProps {}

const sortOrder = (a: OrderModel, b: OrderModel) =>
  new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();

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
  const isLoading = useDashboardStore((state) => state.isLoading);
  return (
    <>
      <h2 className="max-w-6xl mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
        Aktywne zamówienia
      </h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md mt-2">
        <div className="border-b border-gray-200">
          {isLoading ? (
            <Spinner />
          ) : activeOrders.length ? (
            <ul className="divide-y divide-gray-200">
              {activeOrders.map((order) => (
                <DashboardOrdersItem key={order.id} order={order} />
              ))}
            </ul>
          ) : (
            <DashboardOrdersEmpty />
          )}
        </div>
      </div>

      {archivedOrders.length && (
        <>
          <h2 className="max-w-6xl mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
            Zamkniete zamówienia
          </h2>

          <div className="bg-white shadow overflow-hidden sm:rounded-md mt-2">
            <div className="border-b border-gray-200">
              <ul className="divide-y divide-gray-200">
                {archivedOrders.map((order) => (
                  <DashboardOrdersItem key={order.id} order={order} />
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
