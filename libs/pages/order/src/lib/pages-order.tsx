import { useParams } from 'react-router-dom';
import { Spinner } from '@pasnik/layout';
import OrderHeader from './order-header/order-header';
import { Fragment, useEffect, useState } from 'react';
import OrderDishes from './order-dishes/order-dishes';
import OrderTimeline from './order-timeline/order-timeline';
import { useOrderFacade } from './order-store/order.facade';
import { useOrderStore } from './order-store/order.store';

export interface PagesOrderProps {
  orderId: string;
}

export function PagesOrder() {
  const [isLoading, setIsLoading] = useState(true);
  const order = useOrderStore((state) => state.order);
  const dishes = useOrderStore((state) => Object.values(state.dishes ?? {}));
  const { orderId } = useParams<PagesOrderProps>();
  const { fetchOrder, fetchDishes } = useOrderFacade();

  useEffect(() => {
    fetchOrder(orderId).then((_order) => {
      setIsLoading(false);
    });
    fetchDishes(orderId).then((_dishes) => {
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <header className="bg-white shadow">
        <OrderHeader order={order!} dishes={dishes} />
      </header>
      <main className="flex-grow">
        <div className="mt-8">
          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              <OrderDishes order={order!} dishes={dishes!} />
            </div>
            <OrderTimeline actions={order?.actions} />
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default PagesOrder;
