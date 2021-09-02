import { OrderModel } from '@pasnik/api/data-transfer';
import { useEffect, useState } from 'react';
import { authFetch } from '../utils/authFetch';
import { useHistory } from 'react-router-dom';

export default function Dashboard() {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const history = useHistory();

  const makeOrderHandler = () => {
    const path = '/create-order';
    history.push(path);
  }

  useEffect(() => {
    authFetch('/api/orders')
      .then((res) => res.json())
      .then((orders: OrderModel[]) => setOrders(orders));
  }, []);

  return (
    <div>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.id} - {order.from}
          </li>
        ))}
      </ul>
      <button onClick={() => makeOrderHandler()}>Make order</button>
    </div>
  );
}
