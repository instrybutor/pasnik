import { CardActionArea, styled } from '@mui/material';
import { OrderModel } from '@pasnik/api/data-transfer';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import OrderElement from '../OrderElement';

export default function OrderList(props: { orders: OrderModel[] }) {
  const history = useHistory();

  const StyledCardActionArea = styled(CardActionArea)(() => ({
    margin: 8,
    padding: 8,
    border: '1px solid black',
    borderRadius: 10,
    boxShadow: 'inset 0 7px 30px -10px rgba(150,170,180,0.5)',
  }));

  const routeChange = useCallback(
    (id: string) => {
      history.push(`/order/${id}`);
    },
    [history]
  );

  return (
    <>
      {props.orders.map((order) => (
        <StyledCardActionArea
          className="raise"
          onClick={() => routeChange(order.id)}
        >
          <OrderElement order={order}></OrderElement>
        </StyledCardActionArea>
      ))}
    </>
  );
}
