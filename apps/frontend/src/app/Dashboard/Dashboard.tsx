import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { OrderModel } from '@pasnik/api/data-transfer';

import { authFetch } from '../utils/authFetch';

export default function Dashboard() {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const history = useHistory();

  const makeOrderHandler = () => {
    const path = '/create-order';
    history.push(path);
  };

  useEffect(() => {
    authFetch('/api/orders')
      .then((res) => res.json())
      .then((orders: OrderModel[]) => setOrders(orders));
  }, []);

  return (
    <div className="p-4">
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.id} - {order.from}
          </li>
        ))}
      </ul>
      <button
        className="bg-green-400 hover:bg-green-500 text-white p-2 px-4 rounded"
        onClick={makeOrderHandler}
      >
        Make order
      </button>
    </div>
  );
}
