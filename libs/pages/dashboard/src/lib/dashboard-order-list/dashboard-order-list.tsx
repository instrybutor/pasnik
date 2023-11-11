import { StackedList } from '@pasnik/components';
import { OrderModel } from '@pasnik/api/data-transfer';
import { DashboardOrderListSkeleton } from './dashboard-order-list-skeleton';
import { DashboardOrderListItem } from './dashboard-order-list-item';

export interface DashboardOrderListProps {
  orders: OrderModel[];
}

export function DashboardOrderList({ orders }: DashboardOrderListProps) {
  return (
    <StackedList>
      {orders.map((order) => (
        <DashboardOrderListItem order={order} key={order.slug} />
      ))}
    </StackedList>
  );
}

DashboardOrderList.Skeleton = DashboardOrderListSkeleton;
