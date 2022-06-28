import { useOrder } from '@pasnik/features/orders';
import { Navigate } from 'react-router-dom';
import { WorkspaceAbilityProvider } from '@pasnik/features/workspaces';
import { OrderHeader } from '../order-header/order-header';
import { OrderDishesSection } from '../order-dishes-section/order-dishes-section';
import { OrderTimelineSection } from '../order-timeline-section/order-timeline-section';
import { useEffect } from 'react';
import { useSidebarContext } from '@pasnik/layout';
import { OrderStatus } from '@pasnik/api/data-transfer';
import { OrderProcessSection } from '../order-process-section/order-process-section';
import { useOrderState } from '../order-state/order-state';
import { OrderSummarySection } from '../order-summary-section/order-summary-section';
import { OrderETASection } from '../order-eta-section/order-eta-section';
import { OrderBalanceSection } from '../order-balance-section/order-balance-section';
import { OrderContainerSkeleton } from '../order-container-skeleton/order-container-skeleton';

export interface OrderContainerProps {
  slug: string;
}

export function OrderContainer({ slug }: OrderContainerProps) {
  const { data: order, isLoading } = useOrder(slug);
  const { setCurrentWorkspaceIdContext } = useSidebarContext();
  const { setShippingCents } = useOrderState();

  useEffect(() => {
    setCurrentWorkspaceIdContext(order?.workspaceId ?? null);
    return () => {
      setCurrentWorkspaceIdContext(null);
    };
  }, [order, setCurrentWorkspaceIdContext]);

  useEffect(() => {
    if (order?.shippingCents) {
      setShippingCents(order.shippingCents);
    }
  }, [order?.shippingCents, setShippingCents]);

  if (isLoading) {
    return <OrderContainerSkeleton />;
  }

  if (!order || !order.workspace) {
    return <Navigate to="/" />;
  }

  return (
    <WorkspaceAbilityProvider slug={order.workspace.slug}>
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
