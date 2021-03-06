import {
  Price,
  StackedList,
  UserAvatar,
  UserName,
  Users,
} from '@pasnik/components';
import { NavLink } from 'react-router-dom';
import { OrderStatusBadge, OrderTimestamp } from '@pasnik/features/orders';
import { CashIcon } from '@heroicons/react/outline';
import { OrderModel } from '@pasnik/api/data-transfer';

export interface WorkspaceOrderListProps {
  orders: OrderModel[];
}

export function WorkspaceOrderList({ orders }: WorkspaceOrderListProps) {
  return (
    <StackedList>
      {orders.map((order) => (
        <StackedList.Item
          key={order.id}
          wrapper={({ children }) => (
            <NavLink
              to={`/order/${order.slug}`}
              className="block hover:bg-gray-50"
            >
              {children}
            </NavLink>
          )}
          title={order.from}
          titleRight={<OrderStatusBadge order={order} />}
          subTitle={
            <>
              <StackedList.SubItem className="sm:w-40">
                <UserAvatar user={order.user} size="xsm" className="mr-2" />
                <UserName user={order.user} />
              </StackedList.SubItem>
              <StackedList.SubItem className="sm:w-24">
                <CashIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span className="truncate">
                  <Price priceCents={order.totalPrice} />
                </span>
              </StackedList.SubItem>
              <StackedList.SubItem>
                <OrderTimestamp order={order} showIcon={true} />
              </StackedList.SubItem>
            </>
          }
          subTitleRight={
            <Users
              avatarSize="xsm"
              usersToShow={3}
              users={order.participants}
            />
          }
        />
      ))}
    </StackedList>
  );
}
