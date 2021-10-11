import { NavLink } from 'react-router-dom';
import { OrderStatusBadge } from '../../../../order/src/lib/order-status-badge/order-status-badge';
import { CalendarIcon, UserIcon } from '@heroicons/react/outline';
import { DateDistance, UserName } from '@pasnik/components';
import { OrderModel } from '@pasnik/api/data-transfer';

export interface DashboardOrdersItemProps {
  order: OrderModel;
}

export function DashboardOrdersItem({ order }: DashboardOrdersItemProps) {
  return (
    <li>
      <NavLink to={`/order/${order.id}`} className="block hover:bg-gray-50">
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
  );
}

export default DashboardOrdersItem;
