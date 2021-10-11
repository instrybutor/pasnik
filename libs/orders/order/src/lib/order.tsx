import { useParams } from 'react-router-dom';
import { Spinner } from '@pasnik/layout';

import OrderHeader from './components/order-header/order-header';
import { useEffect, useState } from 'react';
import OrderDishes from './components/order-dishes/order-dishes';
import OrderTimeline from './components/order-timeline/order-timeline';
import { useOrderFacade } from './components/order-store/order.facade';
import { useOrderStore } from './components/order-store/order.store';

export interface OrderParams {
  orderId: string;
}

export function Order() {
  const [isLoading, setIsLoading] = useState(true);
  const order = useOrderStore((state) => state.order);
  const dishes = useOrderStore((state) => Object.values(state.dishes ?? {}));
  const { orderId } = useParams<OrderParams>();
  const { fetchOrder, fetchDishes } = useOrderFacade();

  useEffect(() => {
    Promise.all([fetchOrder(orderId), fetchDishes(orderId)]).then(() =>
      setIsLoading(false)
    );
  }, [fetchDishes, fetchOrder, orderId]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <header className="bg-white shadow">
        <OrderHeader order={order!} />
      </header>
      <main className="flex-grow">
        <div className="mt-8">
          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              <OrderDishes order={order!} dishes={dishes!} />
            </div>
            <OrderTimeline actions={order!.actions!} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Order;
