import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import { useOrdersFacade } from '@pasnik/orders-data-access';
import { useAuth } from '@pasnik/shared/utils-auth';
import { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const initDate = new Date();

const mockOrders: OrderModel[] = [
  {
    createdAt: initDate,
    from: 'Order Name1',
    dishes: [
      {
        name: 'mockDish 1',
        priceCents: 2000,
        user: { id: 2, email: 'example@example2.com' },
        paid: false,
      },
      {
        name: 'mockDish 2',
        priceCents: 2000,
        user: { id: 2, email: 'example@example2s.com' },
        paid: true,
      },
      {
        name: 'mockDish 3',
        priceCents: 3030,
        user: { id: 1, email: 'example@example1.com' },
        paid: true,
      },
    ],
    id: '',
    shippingCents: 1000,
    menuUrl: 'example.com',
    orderedAt: '',
    status: OrderStatus.InProgress,
    updatedAt: initDate,
    user: { id: 1, email: 'example@example1.com' },
  },
  {
    createdAt: initDate,
    from: 'Order Name',
    dishes: [
      {
        name: 'mockDish 1',
        priceCents: 1111,
        user: { id: 1, email: 'example@example1.com' },
        paid: true,
      },
      {
        name: 'mockDish 2',
        priceCents: 2222,
        user: { id: 2, email: 'example@example2.com' },
        paid: true,
      },
      {
        name: 'mockDish 3',
        priceCents: 3333,
        user: { id: 1, email: 'example@example1.com' },
        paid: true,
      },
    ],
    id: '',
    shippingCents: 1000,
    menuUrl: 'example.com',
    orderedAt: '',
    status: OrderStatus.InProgress,
    updatedAt: initDate,
    user: { id: 1, email: 'example@example1.com' },
  },
  {
    createdAt: initDate,
    from: 'Order Name',
    dishes: [
      {
        name: 'mockDish 1',
        priceCents: 2150,
        user: { id: 2, email: 'example@example1.com' },
        paid: false,
      },
      {
        name: 'mockDish 2',
        priceCents: 1030,
        user: { id: 1, email: 'example@example2.com' },
        paid: false,
      },
      {
        name: 'mockDish 3',
        priceCents: 3820,
        user: { id: 1, email: 'example@example2.com' },
        paid: true,
      },
    ],
    id: '',
    shippingCents: 300,
    menuUrl: 'example.com',
    orderedAt: '',
    status: OrderStatus.InProgress,
    updatedAt: new Date('-03-25T19:00:00Z'),
    user: { id: 2, email: 'example@example1.com' },
  },
];

export const BalanceView: FC = () => {
  const auth = useAuth();
  const currentUserid = 1;

  const { fetchOrders } = useOrdersFacade();

  const [orders, setOrders] = useState<OrderModel[]>(mockOrders); //

  const [balanceObject, setBalanceObject] = useState({
    moneySpentTotal: 0,
    currentDebt: 0,
    moneyPeopleOweYou: 0,
    moneyPeopleGaveYou: 0,
    totalBalance: 0,
    lastTimeBalanceChanged: new Date('-03-25T12:00:00Z'),
  });

  useEffect(() => {
    let moneySpentTotal = 0;
    let currentDebt = 0;
    let moneyPeopleOweYou = 0;
    let moneyPeopleGaveYou = 0;
    let lastTimeBalanceChanged = new Date();
    // fetchOrders().then((orders) => {
    orders.forEach((order) => {
      const usersCountList: Array<number> = [];

      order.dishes.forEach((dish) => {
        if (order.user.id === currentUserid) {
          if (dish.user.id === currentUserid) {
            moneySpentTotal += dish.priceCents;
          } else {
            dish.paid
              ? (moneyPeopleGaveYou = +dish.priceCents)
              : (moneyPeopleOweYou = +dish.priceCents);
          }
        } else {
          if (dish.user.id === currentUserid) {
            currentDebt += dish.priceCents;
          }
        }
        !usersCountList.includes(dish.user.id) &&
          usersCountList.push(dish.user.id);
      });
      order.updatedAt > lastTimeBalanceChanged &&
        (lastTimeBalanceChanged = order.updatedAt);
      if (order.shippingCents) {
        if (order.user.id === currentUserid) {
          moneyPeopleOweYou +=
            (order.shippingCents / usersCountList.length) *
            (usersCountList.length - 1);
        } else {
          currentDebt += order.shippingCents / usersCountList.length;
        }
      }
    });
    const totalBalance = moneyPeopleOweYou - currentDebt;
    setBalanceObject({
      moneySpentTotal,
      currentDebt,
      moneyPeopleOweYou,
      moneyPeopleGaveYou,
      totalBalance,
      lastTimeBalanceChanged,
    });
    // });
  }, []);
  const history = useHistory();

  const onClickHandler = useCallback(() => history.push(`/`), [history]);
  return (
    <Container>
      <Box
        sx={{
          marginTop: 2,
          border: '1px',
          borderStyle: 'solid',
          borderColor: '#9ca3af',
          borderRadius: '0.25rem',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Typography variant="h3">
              Your Balance: {balanceObject.totalBalance / 100} PLN
            </Typography>
            &nbsp;
          </Grid>

          <Grid
            item
            xs={6}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Typography variant="h5">
              You owe to others: {balanceObject.currentDebt / 100} PLN
            </Typography>
            &nbsp;
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Typography variant="h5">
              People owe you: {balanceObject.moneyPeopleOweYou / 100} PLN
            </Typography>
            &nbsp;
          </Grid>

          <Grid
            item
            xs={6}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Typography variant="h5">
              Money people gave you: {balanceObject.moneyPeopleGaveYou / 100}{' '}
              PLN
            </Typography>
            &nbsp;
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Typography variant="h5">
              Money you have spent on food:
              {balanceObject.moneySpentTotal / 100} PLN
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Typography variant="h5">
              Balance last updated: {initDate.toLocaleString()}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Button variant="outlined" onClick={onClickHandler}>
              BACK TO RECIPES
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
