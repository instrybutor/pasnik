import { NavLink } from 'react-router-dom';
import {
  CalendarIcon,
  CashIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/outline';
import { Price, UserAvatar, UserName, Users } from '@pasnik/components';
import { OrderModel } from '@pasnik/api/data-transfer';
import { OrderStatusBadge, OrderTimestamp } from '@pasnik/pages/order';
import { WorkspaceName } from '@pasnik/features/workspaces';

export interface DashboardOrdersItemProps {
  order: OrderModel;
}

export function DashboardOrdersItem({ order }: DashboardOrdersItemProps) {
  return (
    <li>
      <NavLink to={`/order/${order.slug}`} className="block hover:bg-gray-50">
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
              <div className="mt-2 flex items-center text-sm text-gray-800 sm:mt-0 sm:w-40">
                <UserAvatar user={order.user} size="xsm" className="mr-2" />
                <UserName user={order.user} />
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6 sm:w-24">
                <CashIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span className="truncate">
                  <Price priceCents={order.totalPrice} />
                </span>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6 sm:w-32">
                <OfficeBuildingIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <WorkspaceName workspace={order.workspace} />
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <OrderTimestamp order={order} />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
              {order.participants && (
                <Users
                  users={order.participants}
                  avatarSize="xsm"
                  usersToShow={3}
                />
              )}
            </div>
          </div>
        </div>
      </NavLink>
    </li>
  );
}

export default DashboardOrdersItem;
