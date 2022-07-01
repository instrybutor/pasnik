import { WorkspaceAbilityProvider } from '@pasnik/features/workspaces';
import { OrderHeader } from '../order-header/order-header';
import { OrderDishesSection } from '../order-dishes-section/order-dishes-section';
import { OrderTimelineSection } from '../order-timeline-section/order-timeline-section';
import { useEffect } from 'react';
import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import { OrderProcessSection } from '../order-process-section/order-process-section';
import { useOrderState } from '../order-state/order-state';
import { OrderSummarySection } from '../order-summary-section/order-summary-section';
import { OrderETASection } from '../order-eta-section/order-eta-section';
import { OrderBalanceSection } from '../order-balance-section/order-balance-section';

export interface OrderContainerProps {
  order: OrderModel;
}

export function OrderContainer({ order }: OrderContainerProps) {
  const { setShippingCents } = useOrderState();

  useEffect(() => {
    setShippingCents(order.shippingCents ?? 0);
  }, [order.shippingCents, setShippingCents]);

  return (
    <WorkspaceAbilityProvider slug={order.workspace?.slug}>
      <OrderHeader order={order} />
      <main className="mt-8 max-w-4xl mx-auto grid grid-cols-1 gap-6 sm:px-6 xl:max-w-7xl xl:grid-flow-col-dense xl:grid-cols-3 w-full">
        <div className="space-y-6 xl:col-start-1 xl:col-span-2">
          {order.status === OrderStatus.InProgress ? (
            <OrderDishesSection order={order} />
          ) : order.status === OrderStatus.Processing ? (
            <OrderProcessSection order={order} />
          ) : (
            <>
              {order.status === OrderStatus.Ordered ? (
                <OrderETASection order={order} />
              ) : (
                <OrderBalanceSection order={order} />
              )}

              <OrderSummarySection order={order} />
            </>
          )}
        </div>
        <div className="space-y-6 xl:col-start-3 xl:col-span-1">
          <OrderTimelineSection order={order} />
        </div>
      </main>
    </WorkspaceAbilityProvider>
  );
}
