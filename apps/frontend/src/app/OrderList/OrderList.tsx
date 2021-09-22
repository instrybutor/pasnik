import { OrderModel } from '@pasnik/api/data-transfer';
import OrderElement from '../OrderElement';

export default function OrderList(props: { orders: OrderModel[] }) {
  return (
    <div>
      {props.orders.map((order, index) => (
        <OrderElement order={order} index={index}></OrderElement>
      ))}
    </div>
  );
}
