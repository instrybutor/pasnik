import { Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import { useOrdersFacade } from '@pasnik/orders-data-access';

export default function Dashboard() {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const { fetchOrders } = useOrdersFacade();
  const history = useHistory();

  const makeOrderHandler = () => {
    const path = '/create-order';
    history.push(path);
  };

  useEffect(() => {
    fetchOrders().then((orders) => setOrders(orders));
  }, [fetchOrders]);

  return (
    <div className="p-4">
      <button
        className="bg-green-400 hover:bg-green-500 text-white p-2 px-4 rounded"
        onClick={makeOrderHandler}
      >
        Make order
      </button>
      <div className="grid grid-flow-row grid-cols-12 grid-rows-3 gap-1 my-2">
        {orders.map((order, index) => (
          <Fragment key={order.id}>
            <div className="bg-gray-100 col-span-1 p-2 rounded">
              {index + 1}
            </div>
            <div className="bg-gray-100 col-span-2 p-2 rounded">
              <Link to={`/order/${order.id}`}>{order.from}</Link>
            </div>
            <div className="bg-gray-100 col-span-5 p-2 rounded">
              {order.menuUrl}
            </div>
            <div className="bg-gray-100 col-span-2 p-2 rounded">
              {order.createdAt}
            </div>
            <div className="bg-gray-100 col-span-2 p-2 rounded">
              <span className="bg-green-300 text-white text-xs p-2 py-1 rounded">
                {OrderStatus[order.status]}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
