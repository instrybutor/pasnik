import { CreateOrderDto, OrderModel } from '@pasnik/api/data-transfer';
import { useEffect, useState } from 'react';
import { authFetch } from '../utils/authFetch';

export default function Dashboard() {
  const [orders, setOrders] = useState<OrderModel[]>([]);

  const createOrderParams = (): CreateOrderDto => {
    const now = new Date();
    now.setHours(now.getHours() + 2);

    return {
      orderAt: now.toISOString(),
      from: 'Pobite Gary',
      menuUrl: 'http://pobitegary.online/',
    };
  };
  const makeOrder = () => {
    authFetch('/api/orders', {
      method: 'post',
      body: JSON.stringify(createOrderParams()),
    })
      .then((response) => response.json())
      .then((order: OrderModel) => setOrders([...orders, order]));
  };

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
      <button onClick={() => makeOrder()}>Make order</button>
    </div>
  );
}
