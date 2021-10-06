import { useParams } from 'react-router-dom';
import { Spinner } from '@pasnik/layout';
import OrderHeader from './order-header/order-header';
import { Fragment, useEffect, useState } from 'react';
import { authFetch } from '@pasnik/shared/utils-auth';
import { OrderModel } from '@pasnik/api/data-transfer';
import OrderDishes from './order-dishes/order-dishes';
import OrderTimeline from './order-timeline/order-timeline';

export interface PagesOrderProps {
  orderId: string;
}

export function PagesOrder() {
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<OrderModel>();
  const { orderId } = useParams<PagesOrderProps>();

  useEffect(() => {
    authFetch<OrderModel>(`/api/orders/${orderId}`).then((_order) => {
      setOrder(_order);
      setIsLoading(false);
    });
  }, [orderId]);

  return isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <header className="bg-white shadow">
        <OrderHeader order={order!} />
      </header>
      <main className="flex-grow">
        <div className="mt-8">
          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              <OrderDishes order={order!} />
            </div>
            <OrderTimeline order={order!} />
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default PagesOrder;
