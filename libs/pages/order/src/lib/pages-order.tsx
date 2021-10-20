import { useParams } from 'react-router-dom';
import OrderHeader from './order-header/order-header';
import { Fragment, useEffect } from 'react';
import OrderDishes from './order-dishes/order-dishes';
import OrderTimeline from './order-timeline/order-timeline';
import { useOrderFacade } from './order-store/order.facade';
import { useOrderStore } from './order-store/order.store';
import { OrderStatus } from '@pasnik/api/data-transfer';
import OrderSummary from './order-summary/order-summary';
import OrderHeaderLoading from './order-header-loading/order-header-loading';
import OrderSectionLoading from './order-section-loading/order-section-loading';

export interface PagesOrderProps {
  orderId: string;
}

export function PagesOrder() {
  const isOrderLoading = useOrderStore((state) => state.isOrderLoading);
  const isDishesLoading = useOrderStore((state) => state.isDishesLoading);
  const order = useOrderStore((state) => state.order);
  const dishes = useOrderStore((state) => Object.values(state.dishes ?? {}));
  const { orderId } = useParams<PagesOrderProps>();
  const { fetchOrder, fetchDishes, resetStore } = useOrderFacade();

  useEffect(() => {
    fetchOrder(orderId).then();
    fetchDishes(orderId).then();
    return () => {
      resetStore();
    };
  }, [fetchDishes, fetchOrder, orderId, resetStore]);

  return (
    <Fragment>
      <header className="bg-white shadow">
        {isOrderLoading ? (
          <OrderHeaderLoading />
        ) : (
          <OrderHeader order={order!} dishes={dishes} />
        )}
      </header>
      <main className="flex-grow">
        <div className="mt-8">
          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              {isDishesLoading ? (
                <OrderSectionLoading className="h-52" />
              ) : order?.status === OrderStatus.InProgress ? (
                <OrderDishes order={order} dishes={dishes!} />
              ) : (
                <OrderSummary dishes={dishes!} order={order!} />
              )}
            </div>
            {isOrderLoading ? (
              <OrderSectionLoading className="h-52" />
            ) : (
              <OrderTimeline actions={order?.actions} />
            )}
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default PagesOrder;
