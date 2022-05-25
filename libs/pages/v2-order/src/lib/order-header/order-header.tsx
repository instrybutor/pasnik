import { OrderModel } from '@pasnik/api/data-transfer';
import { Header, HeaderBreadcrumbs } from '@pasnik/components';
import { useCallback } from 'react';
import { OrderStatusBadge } from '@pasnik/features/orders';

export interface OrderHeaderProps {
  order: OrderModel;
}

export function OrderHeader({ order }: OrderHeaderProps) {
  const backElement = useCallback(() => {
    return (
      <HeaderBreadcrumbs.Back to={`/workspace/${order.workspace!.slug}`}>
        Wróć do {order.workspace!.name}
      </HeaderBreadcrumbs.Back>
    );
  }, [order]);
  return (
    <Header
      className="bg-white shadow"
      left={
        <>
          <HeaderBreadcrumbs back={backElement}>
            {order.workspace && (
              <HeaderBreadcrumbs.Item to={`/workspace/${order.workspace.slug}`}>
                {order.workspace.name}
              </HeaderBreadcrumbs.Item>
            )}
          </HeaderBreadcrumbs>
          <h1 className="mt-4 text-2xl font-normal leading-7 text-gray-900 sm:mt-2 sm:leading-9 sm:truncate flex items-center">
            {order.from}
            <div className="inline-flex ml-4">
              <OrderStatusBadge order={order} />
            </div>
          </h1>
        </>
      }
    />
  );
}
