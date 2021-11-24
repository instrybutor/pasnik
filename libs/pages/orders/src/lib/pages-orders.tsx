import { Fragment, useEffect } from 'react';
import { useOrdersFacade } from './orders-store/orders.facade';
import { Spinner } from '@pasnik/layout';
import OrdersHeader from './orders-header/orders-header';
import OrderList from './order-list/order-list';
import { useOrdersStore } from './orders-store/orders.store';
import OrdersEmpty from './orders-empty/orders-empty';
import { useUserStore } from '@pasnik/store';

export function PagesOrders() {
  const workspaceId = useUserStore((state) => state.user?.currentWorkspaceId);
  const { fetchOrders, isFetching } = useOrdersFacade();
  const orders = useOrdersStore((state) => Object.values(state.entities!));

  useEffect(() => {
    fetchOrders(workspaceId!);
  }, [fetchOrders, workspaceId]);

  return (
    <Fragment>
      <header className="bg-white shadow">
        <OrdersHeader />
      </header>
      <main className="flex-grow flex-1">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white relative shadow overflow-hidden sm:rounded-md">
              <div className="border-b border-gray-200">
                {isFetching && <Spinner />}
                {orders.length ? (
                  <OrderList orders={orders} />
                ) : (
                  <OrdersEmpty />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default PagesOrders;
