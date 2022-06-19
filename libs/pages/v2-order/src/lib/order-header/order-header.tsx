import { OrderModel } from '@pasnik/api/data-transfer';
import { Header } from '@pasnik/components';
import { OrderStatusBadge } from '@pasnik/features/orders';
import { OrderHeaderActions } from '../order-header-actions/order-header-actions';

export interface OrderHeaderProps {
  order: OrderModel;
}

export function OrderHeader({ order }: OrderHeaderProps) {
  return (
    <Header
      className="bg-white shadow"
      left={
        <h1 className="text-2xl font-normal leading-7 text-gray-900 sm:leading-9 sm:truncate flex items-center">
          {order.from}
          <div className="inline-flex ml-4">
            <OrderStatusBadge order={order} />
          </div>
        </h1>
      }
      right={<OrderHeaderActions order={order} />}
    />
  );
}
