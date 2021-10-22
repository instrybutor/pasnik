import { NavLink } from 'react-router-dom';
import { OrderModel } from '@pasnik/api/data-transfer';
import { CalendarIcon, CashIcon, UserIcon } from '@heroicons/react/outline';
import { OrderStatusBadge, OrderTimestamp } from '@pasnik/pages/order';
import { UserName } from '@pasnik/components';

export interface OrderListProps {
  orders: OrderModel[];
}

export function OrderList({ orders }: OrderListProps) {
  return (
    <ul className="divide-y divide-gray-200">
      {orders.map((order) => (
        <li key={order.id}>
          <NavLink
            to={`/order/${order.slug}`}
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
                  <p className="flex items-center text-sm text-gray-500">
                    <CashIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    {order.totalPrice}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    <UserIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <UserName user={order.user} />
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  <OrderTimestamp order={order} />
                </div>
              </div>
            </div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default OrderList;
