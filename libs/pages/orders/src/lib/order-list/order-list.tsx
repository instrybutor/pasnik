import { Price, StackedList, UserAvatar, UserName } from '@pasnik/components';
import { NavLink } from 'react-router-dom';
import { OrderStatusBadge, OrderTimestamp } from '@pasnik/features/orders';
import { CashIcon, OfficeBuildingIcon } from '@heroicons/react/outline';
import { OrderModel } from '@pasnik/api/data-transfer';
import { WorkspaceName } from '@pasnik/features/workspaces';

export interface OrderListProps {
  orders: OrderModel[];
}

export function OrderList({ orders }: OrderListProps) {
  return (
    <StackedList>
      {orders.map((order) => (
        <StackedList.Item
          key={order.slug}
          wrapper={({ children }) => (
            <NavLink
              to={`/order/${order.slug}`}
              className="block hover:bg-gray-50"
            >
              {children}
            </NavLink>
          )}
          title={order.operation.name}
          titleRight={<OrderStatusBadge order={order} />}
          subTitle={
            <>
              <StackedList.SubItem className="sm:w-40">
                <UserAvatar user={null} size="xsm" className="mr-2" />
                <UserName user={null} />
              </StackedList.SubItem>
              <StackedList.SubItem className="sm:w-24">
                <CashIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span className="truncate">
                  <Price priceCents={order.operation.priceCents} />
                </span>
              </StackedList.SubItem>
              <StackedList.SubItem className="sm:w-32">
                <OfficeBuildingIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <WorkspaceName workspace={order.operation.workspace} />
              </StackedList.SubItem>
              <StackedList.SubItem>
                <OrderTimestamp order={order} showIcon={true} />
              </StackedList.SubItem>
            </>
          }
          // subTitleRight={
          //   <Users
          //     avatarSize="xsm"
          //     usersToShow={3}
          //     users={order.participants}
          //   />
          // }
        />
      ))}
    </StackedList>
  );
}
