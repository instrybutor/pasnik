import { useNavigate, useParams } from 'react-router-dom';
import { useWorkspaceFacade } from '@pasnik/features/workspaces';
import { useEffect } from 'react';
import { useWorkspaceOrdersStore } from './workspace-store/workspace-orders.store';
import { useWorkspaceUsersStore } from './workspace-store/workspace-users.store';
import { WorkspaceHeader } from './workspace-header/workspace-header';
import {
  Price,
  StackedList,
  UserAvatar,
  UserName,
  Users,
} from '@pasnik/components';
import { OrderStatusBadge } from '@pasnik/features/orders';
import { CalendarIcon, CashIcon } from '@heroicons/react/outline';
import { OrderTimestamp } from '@pasnik/pages/order';

/* eslint-disable-next-line */
export interface PagesWorkspaceProps {}

export function PagesWorkspace(props: PagesWorkspaceProps) {
  const navigation = useNavigate();
  const { currentWorkspace } = useWorkspaceFacade();
  const { slug } = useParams<'slug'>();
  const { fetchActiveOrders, orders } = useWorkspaceOrdersStore();
  const { fetchUsers } = useWorkspaceUsersStore();

  useEffect(() => {
    if (currentWorkspace?.slug !== slug) {
      navigation(`/workspace/${currentWorkspace?.slug}`);
    } else if (currentWorkspace) {
      Promise.all([
        fetchActiveOrders(currentWorkspace),
        fetchUsers(currentWorkspace),
      ]);
    }
  }, [currentWorkspace, navigation, slug, fetchActiveOrders, fetchUsers]);

  return (
    <>
      <header className="bg-white shadow">
        <WorkspaceHeader />
      </header>

      <h2 className="max-w-6xl mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
        Aktywne zamówienia
      </h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md mt-2">
        <div className="border-b border-gray-200">
          <StackedList>
            {orders.map((order) => (
              <StackedList.Item
                key={order.id}
                title={order.from}
                titleRight={<OrderStatusBadge order={order} />}
                subTitle={
                  <>
                    <StackedList.SubItem className="sm:w-40">
                      <UserAvatar
                        user={order.user}
                        size="xsm"
                        className="mr-2"
                      />
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
                      <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <OrderTimestamp order={order} />
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
        </div>
      </div>
    </>
  );
}

export default PagesWorkspace;
