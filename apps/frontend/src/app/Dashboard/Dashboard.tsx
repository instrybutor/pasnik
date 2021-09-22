import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import { useOrdersFacade } from '@pasnik/orders-data-access';
import OrderList from '../OrderList';

export default function Dashboard() {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const { fetchOrders } = useOrdersFacade();
  const history = useHistory();

  const makeOrderHandler = () => {
    const path = '/create-order';
    history.push(path);
  };

  useEffect(() => {
    !orders.length && fetchOrders().then((orders) => setOrders(orders));
  }, []);

  return (
    <div className="p-4">
      <button
        className="bg-green-400 hover:bg-green-500 text-white p-2 px-4 rounded"
        onClick={makeOrderHandler}
      >
        Make order
      </button>
      <div className="grid grid-flow-row grid-cols-12 grid-rows-3 gap-1 my-2">
        <OrderList orders={orders}></OrderList>
      </div>
    </div>
  );
}
