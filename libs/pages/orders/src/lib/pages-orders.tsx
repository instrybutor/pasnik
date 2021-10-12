import { Fragment, useEffect, useState } from 'react';
import { useOrdersFacade } from './orders-store/orders.facade';
import { Spinner } from '@pasnik/layout';
import OrdersHeader from './orders-header/orders-header';
import OrderList from './order-list/order-list';
import { useOrdersStore } from './orders-store/orders.store';
import OrdersEmpty from './orders-empty/orders-empty';

/* eslint-disable-next-line */
export interface PagesOrdersProps {}

export function PagesOrders(_: PagesOrdersProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { fetchOrders } = useOrdersFacade();
  const orders = useOrdersStore((state) => Object.values(state.entities!));

  useEffect(() => {
    fetchOrders().then(() => {
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                {isLoading && <Spinner />}
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
