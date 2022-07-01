import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';

import { AxiosError } from '@pasnik/axios';
import { useToast } from '@pasnik/components';
import { useSidebarContext } from '@pasnik/layout';

import { OrderContainer } from './order-container/order-container';
import { useOrder } from '@pasnik/features/orders';
import { OrderContainerSkeleton } from './order-container-skeleton/order-container-skeleton';

export function PagesOrderDetails() {
  const { slug } = useParams<'slug'>();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { data: order, isLoading } = useOrder(slug);

  const { setCurrentWorkspaceSlugContext } = useSidebarContext();

  useEffect(() => {
    setCurrentWorkspaceSlugContext(order?.workspace?.slug ?? null);
    return () => {
      setCurrentWorkspaceSlugContext(null);
    };
  }, [order?.slug, setCurrentWorkspaceSlugContext]);

  if (!slug) {
    return <Navigate to="/" />;
  }

  const errorHandler = (error: Error, info: { componentStack: string }) => {
    if ((error as AxiosError).isAxiosError) {
      toast({
        type: 'error',
        title: t('errors.server.title'),
      });
    }
  };

  return (
    <ErrorBoundary
      fallbackRender={() => <Navigate to="/" />}
      onError={errorHandler}
    >
      {isLoading || !order ? (
        <OrderContainerSkeleton />
      ) : (
        <OrderContainer order={order!} />
      )}
    </ErrorBoundary>
  );
}
