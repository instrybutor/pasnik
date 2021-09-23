import { CardActionArea } from '@mui/material';
import { OrderModel } from '@pasnik/api/data-transfer';
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import OrderElement from '../OrderElement';

export default function OrderList(props: { orders: OrderModel[] }) {
  const history = useHistory();

  const routeChange = (id: string) => {
    history.push(`/order/${id}`);
  };
  return (
    <div>
      {props.orders.map((order, index) => (
        <Fragment key={order.id}>
          <CardActionArea
            className="raise"
            style={{
              margin: 8,
              padding: 8,
              border: '1px solid black',
              borderRadius: 10,
              boxShadow: 'inset 0 7px 30px -10px rgba(150,170,180,0.5)',
            }}
            onClick={(event) => {
              event.preventDefault();
              return routeChange(order.id);
            }}
          >
            <OrderElement order={order} index={index}></OrderElement>
          </CardActionArea>
        </Fragment>
      ))}
    </div>
  );
}
