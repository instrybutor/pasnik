import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function OrderElement(props: {
  order: OrderModel;
  index: number;
}) {
  const { order, index } = props;

  return (
    <Fragment key={order.id}>
      <div className="bg-gray-100 col-span-1 p-2 rounded">{index + 1}</div>
      <div className="bg-gray-100 col-span-2 p-2 rounded">
        <Link to={`/order/${order.id}`}>{order.from}</Link>
      </div>
      <div className="bg-gray-100 col-span-5 p-2 rounded">{order.menuUrl}</div>
      <div className="bg-gray-100 col-span-2 p-2 rounded">
        {order.createdAt}
      </div>
      <div className="bg-gray-100 col-span-2 p-2 rounded">
        <span className="bg-green-300 text-white text-xs p-2 py-1 rounded">
          {OrderStatus[order.status]}
        </span>
      </div>
    </Fragment>
  );
}
