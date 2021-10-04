import { NavLink } from 'react-router-dom';
import { getOrderStatus, OrderModel } from '@pasnik/api/data-transfer';
import { CashIcon, CalendarIcon } from '@heroicons/react/outline';
import { formatDistance } from 'date-fns';
import { pl } from 'date-fns/locale';

/* eslint-disable-next-line */
export interface OrderListProps {
  orders: OrderModel[];
}

export function OrderList(props: OrderListProps) {
  return (
    <ul className="divide-y divide-gray-200">
      {props.orders.map((order) => (
        <li key={order.id}>
          <NavLink to={`/order/${order.id}`} className="block hover:bg-gray-50">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {order.from}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {getOrderStatus(order)}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    <CashIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    55zł
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  <p>
                    Utworzone&nbsp;
                    {formatDistance(new Date(order.createdAt), new Date(), {
                      addSuffix: true,
                      locale: pl,
                    })}
                  </p>
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
