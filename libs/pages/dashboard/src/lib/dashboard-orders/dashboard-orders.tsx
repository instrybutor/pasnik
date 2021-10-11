import { useDashboardStore } from '../dashboard-store/dashboard.store';
import { NavLink } from 'react-router-dom';
import { OrderStatusBadge } from '../../../../order/src/lib/order-status-badge/order-status-badge';
import { CalendarIcon, UserIcon } from '@heroicons/react/outline';
import { DateDistance, UserName } from '@pasnik/components';

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
          <ul className="divide-y divide-gray-200">
            {orders.map((order) => (
              <li key={order.id}>
                <NavLink
                  to={`/order/${order.id}`}
                  className="block hover:bg-gray-50"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-cyan-600 truncate">
                        {order.from}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <OrderStatusBadge order={order} />
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <UserIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <UserName user={order.user} />
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <p>
                          Utworzone <DateDistance date={order.createdAt} />
                        </p>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default DashboardOrders;
