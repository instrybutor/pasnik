import {
  Price,
  StackedList,
  UserAvatar,
  UserName,
  Users,
} from '@pasnik/components';
import { NavLink } from 'react-router-dom';
import { OrderStatusBadge, OrderTimestamp } from '@pasnik/features/orders';
import { CashIcon, OfficeBuildingIcon } from '@heroicons/react/outline';
import { OrderModel } from '@pasnik/api/data-transfer';
import {
  useWorkspaceById,
  useWorkspaceUsersEntities,
  WorkspaceName,
} from '@pasnik/features/workspaces';
import { useMemo } from 'react';

export interface DashboardOrderListItemProps {
  order: OrderModel;
}

export function DashboardOrderListItem({ order }: DashboardOrderListItemProps) {
  const workspace = useWorkspaceById(order.workspaceId);
  const workspaceUsers = useWorkspaceUsersEntities(workspace?.slug);
  const participants = useMemo(() => {
    return order.participants.map(
      (participant) => workspaceUsers[participant.id]?.user
    );
  }, [workspaceUsers, order.participants]);
  return (
    <StackedList.Item
      wrapper={({ children }) => (
        <NavLink to={`/order/${order.slug}`} className="block hover:bg-gray-50">
          {children}
        </NavLink>
      )}
      title={order.operation.name}
      titleRight={<OrderStatusBadge order={order} />}
      subTitle={
        <>
          <StackedList.SubItem className="sm:w-40">
            <UserAvatar
              user={workspaceUsers[order.operation.workspaceUserId]?.user}
              size="xsm"
              className="mr-2"
            />
            <UserName
              user={workspaceUsers[order.operation.workspaceUserId]?.user}
            />
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
            <WorkspaceName workspace={workspace} />
          </StackedList.SubItem>
          <StackedList.SubItem>
            <OrderTimestamp order={order} showIcon={true} />
          </StackedList.SubItem>
        </>
      }
      subTitleRight={
        <Users avatarSize="xsm" usersToShow={3} users={participants} />
      }
    />
  );
}
