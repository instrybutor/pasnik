import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { OrderModel } from '@pasnik/api/data-transfer';
import { useOrdersFacade } from '@pasnik/orders-data-access';
import OrderList from '../OrderList';
import { Button, Grid, Typography } from '@mui/material';

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
    <div>
      &nbsp;
      <Grid container>
        <Grid xs={2} item></Grid>
        <Grid xs={8} container>
          <Grid item xs={10}>
            <Typography variant="h4" color="initial">
              Orders
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              className="raise"
              fullWidth
              variant="outlined"
              onClick={makeOrderHandler}
            >
              Create order
            </Button>
          </Grid>
          <Grid item xs={12}>
            <OrderList orders={orders}></OrderList>
          </Grid>
        </Grid>
        <Grid xs={2}></Grid>
      </Grid>
    </div>
  );
}
