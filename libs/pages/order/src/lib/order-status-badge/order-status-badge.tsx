import { getOrderStatus, OrderModel } from '@pasnik/api/data-transfer';

export interface OrderStatusBadgeProps {
  order: OrderModel;
}

export function OrderStatusBadge({ order }: OrderStatusBadgeProps) {
  return (
    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
      {getOrderStatus(order)}
    </p>
  );
}

export default OrderStatusBadge;
