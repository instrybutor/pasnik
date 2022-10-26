import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { OrderContainer } from './order-container/order-container';
import { useOrder } from '@pasnik/features/orders';
import { WorkspaceProvider } from '@pasnik/features/workspaces';
import { OrderHeader } from './order-header/order-header';
import { OrderContainerSkeleton } from './order-container/order-container-skeleton';
import { OrderHeaderSkeleton } from './order-header/order-header-skeleton';
import { useOrderState } from './order-state/order-state';
import { useSlug } from '@pasnik/shared/utils';
import { useSidebarContext } from '@pasnik/layout';
import { QueryBoundary } from '@pasnik/components';

export function PagesOrderDetails() {
  const slug = useSlug();

  const { data: order } = useOrder(slug, false);
  const { setShippingCents } = useOrderState();

  const { setCurrentWorkspaceIdContext } = useSidebarContext();

  useEffect(() => {
    setCurrentWorkspaceIdContext(order?.operation.workspaceId ?? null);
    return () => {
      setCurrentWorkspaceIdContext(null);
    };
  }, [order?.operation.workspaceId, setCurrentWorkspaceIdContext]);

  useEffect(() => {
    setShippingCents(order?.shippingCents ?? 0);
  }, [order?.shippingCents, setShippingCents]);

  return (
    <ErrorBoundary fallbackRender={() => <Navigate to="/" />}>
      <WorkspaceProvider workspaceId={order?.operation.workspaceId}>
        <QueryBoundary fallback={<OrderHeaderSkeleton />}>
          <OrderHeader />
        </QueryBoundary>
        <QueryBoundary fallback={<OrderContainerSkeleton />}>
          <OrderContainer />
        </QueryBoundary>
      </WorkspaceProvider>
    </ErrorBoundary>
  );
}
