import { useDashboardStore } from '../dashboard-store/dashboard.store';
import DashboardOrdersEmpty from '../dashboard-orders-empty/dashboard-orders-empty';
import DashboardOrdersItem from '../dashboard-orders-item/dashboard-orders-item';

/* eslint-disable-next-line */
export interface DashboardOrdersProps {}

export function DashboardOrders(props: DashboardOrdersProps) {
  const orders = useDashboardStore((state) =>
    Object.values(state.entities ?? {})
  );
  return (
    <>
      <h2 className="max-w-6xl mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
        Aktywne zamówienia
      </h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md mt-2">
        <div className="border-b border-gray-200">
          {orders.length !== 0 ? (
            <ul className="divide-y divide-gray-200">
              {orders.map((order) => (
                <DashboardOrdersItem key={order.id} order={order} />
              ))}
            </ul>
          ) : (
            <DashboardOrdersEmpty />
          )}
        </div>
      </div>
    </>
  );
}

export default DashboardOrders;
