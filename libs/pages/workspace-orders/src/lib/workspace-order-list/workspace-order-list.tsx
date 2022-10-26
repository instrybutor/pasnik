import { Price, StackedList, UserAvatar, UserName } from '@pasnik/components';
import { NavLink } from 'react-router-dom';
import { OrderStatusBadge, OrderTimestamp } from '@pasnik/features/orders';
import { CashIcon } from '@heroicons/react/outline';
import { OrderModel } from '@pasnik/api/data-transfer';
import { WorkspaceUserToUser } from '@pasnik/features/workspaces';

export interface WorkspaceOrderListProps {
  orders: OrderModel[];
}

export function WorkspaceOrderList({ orders }: WorkspaceOrderListProps) {
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
                <WorkspaceUserToUser
                  workspaceUserId={order.operation.workspaceUserId}
                  workspaceId={order.operation.workspaceId}
                >
                  {(user) => (
                    <>
                      <UserAvatar user={user} size="xsm" className="mr-2" />
                      <UserName user={user} />
                    </>
                  )}
                </WorkspaceUserToUser>
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
