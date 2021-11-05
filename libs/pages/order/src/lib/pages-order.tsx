import { Fragment } from 'react';

import { OrderStatus } from '@pasnik/api/data-transfer';

import OrderHeader from './order-header/order-header';
import OrderDishes from './order-dishes/order-dishes';
import OrderTimeline from './order-timeline/order-timeline';
import OrderSummary from './order-summary/order-summary';
import OrderHeaderLoading from './order-header-loading/order-header-loading';
import OrderSectionLoading from './order-section-loading/order-section-loading';

// import * as service from './order-store/order.service';
import { useOrderFacade } from './order-store/order.facade';

export interface PagesOrderProps {
  slug: string;
}

export function PagesOrder() {
  const { orderQuery, dishesQuery } = useOrderFacade();

  const { data: order, isLoading: isOrderLoading } = orderQuery;
  const { data: dishes, isLoading: areDishesLoading } = dishesQuery;

  return (
    <Fragment>
      <header className="bg-white shadow">
        {isOrderLoading || areDishesLoading ? (
          <OrderHeaderLoading />
        ) : (
          <OrderHeader order={order!} dishes={dishes!} />
        )}
      </header>
      <main className="flex-grow">
        <div className="mt-8">
          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              {isOrderLoading || areDishesLoading ? (
                <OrderSectionLoading className="h-52" />
              ) : order?.status === OrderStatus.InProgress ? (
                <OrderDishes order={order} dishes={dishes!} />
              ) : (
                <OrderSummary dishes={dishes!} order={order!} />
              )}
            </div>
            {isOrderLoading || areDishesLoading ? (
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
