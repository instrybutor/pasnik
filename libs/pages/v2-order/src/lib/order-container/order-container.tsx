import { useOrder } from '@pasnik/features/orders';
import { Navigate } from 'react-router-dom';
import { Spinner } from '@pasnik/components';
import { WorkspaceAbilityProvider } from '@pasnik/features/workspaces';
import { OrderHeader } from '../order-header/order-header';
import { OrderSection } from '../order-section/order-section';
import { OrderDishesSection } from '../order-dishes-section/order-dishes-section';
import { OrderTimelineSection } from '../order-timeline-section/order-timeline-section';

export interface OrderContainerProps {
  slug: string;
}

export function OrderContainer({ slug }: OrderContainerProps) {
  const { data: order, isLoading } = useOrder(slug);

  if (isLoading) {
    return <Spinner />;
  }

  if (!order || !order.workspace) {
    return <Navigate to="/" />;
  }

  return (
    <WorkspaceAbilityProvider slug={order.workspace.slug}>
      <OrderHeader order={order} />
      <main className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3 w-full">
        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
          <OrderDishesSection order={order} />
          <OrderSection title="Szczegóły zamówienia">A tu content</OrderSection>
        </div>
        <div className="space-y-6 lg:col-start-3 lg:col-span-1">
          <OrderTimelineSection order={order} />
        </div>
      </main>
    </WorkspaceAbilityProvider>
  );
}
