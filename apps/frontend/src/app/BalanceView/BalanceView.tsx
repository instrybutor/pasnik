import { Box, Container, Grid, Typography } from '@mui/material';
import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import { FC, useEffect, useState } from 'react';

const initDate = new Date('2015-03-25T12:00:00Z');

const mockOrders: OrderModel[] = [
  {
    createdAt: initDate,
    from: 'Order Name1',
    dishes: [
      {
        name: 'mockDish 1',
        priceCents: 1000,
        user: { email: 'example@example2.com' },
        paid: false,
      },
      {
        name: 'mockDish 2',
        priceCents: 2000,
        user: { email: 'example@example2s.com' },
        paid: true,
      },
      {
        name: 'mockDish 3',
        priceCents: 3030,
        user: { email: 'example@example1.com' },
        paid: true,
      },
    ],
    id: '',
    shippingCents: 300,
    menuUrl: 'example.com',
    orderedAt: '',
    status: OrderStatus.InProgress,
    updatedAt: initDate,
    user: { email: 'example@example1.com' },
  },
  {
    createdAt: initDate,
    from: 'Order Name',
    dishes: [
      {
        name: 'mockDish 1',
        priceCents: 1111,
        user: { email: 'example@example1.com' },
        paid: true,
      },
      {
        name: 'mockDish 2',
        priceCents: 2222,
        user: { email: 'example@example1.com' },
        paid: false,
      },
      {
        name: 'mockDish 3',
        priceCents: 3333,
        user: { email: 'example@example1.com' },
        paid: true,
      },
    ],
    id: '',
    shippingCents: 300,
    menuUrl: 'example.com',
    orderedAt: '',
    status: OrderStatus.InProgress,
    updatedAt: initDate,
    user: { email: 'example@example2.com' },
  },
  {
    createdAt: initDate,
    from: 'Order Name',
    dishes: [
      {
        name: 'mockDish 1',
        priceCents: 2150,
        user: { email: 'example@example1.com' },
        paid: false,
      },
      {
        name: 'mockDish 2',
        priceCents: 1030,
        user: { email: 'example@example2.com' },
        paid: false,
      },
      {
        name: 'mockDish 3',
        priceCents: 3820,
        user: { email: 'example@example2.com' },
        paid: true,
      },
    ],
    id: '',
    shippingCents: 300,
    menuUrl: 'example.com',
    orderedAt: '',
    status: OrderStatus.InProgress,
    updatedAt: initDate,
    user: { email: 'example@example1.com' },
  },
];

export const BalanceView: FC = () => {
  const [orders, setOrders] = useState<OrderModel[]>(mockOrders);

  const currentUserEmail = 'example@example1.com';

  const [balanceObject, setBalanceObject] = useState({
    moneySpentTotal: 0,
    currentDebt: 0,
    moneyPeopleOwnYou: 0,
    moneyPeopleGaveYou: 0,
    totalBalance: 0,
  });

  useEffect(() => {
    let moneySpentTotal = 0;
    let currentDebt = 0;
    let moneyPeopleOwnYou = 0;
    let moneyPeopleGaveYou = 0;
    let totalBalance = 0;
    orders.forEach((order) => {
      if (order.user.email === currentUserEmail) {
        order.dishes.forEach((dish) => {
          if (dish.user.email === currentUserEmail) {
            moneySpentTotal += dish.priceCents;
          } else {
            dish.paid
              ? (moneyPeopleGaveYou = +dish.paid)
              : (moneyPeopleOwnYou = +dish.paid);
          }
        });
      } else {
        order.dishes.forEach((dish) => {
          if (dish.user.email === currentUserEmail) {
            currentDebt += dish.priceCents;
          }
        });
      }
    });
    totalBalance = moneyPeopleOwnYou - moneySpentTotal;
    setBalanceObject({
      moneySpentTotal,
      currentDebt,
      moneyPeopleOwnYou,
      moneyPeopleGaveYou,
      totalBalance,
    });
  }, []);
  return (
    <Container>
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h3">
              Your Balance: {balanceObject.totalBalance}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h2">
              You owe: {balanceObject.currentDebt}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h2">
              People owe you: {balanceObject.moneyPeopleOwnYou}
            </Typography>
            <Grid item xs={6}>
              <Typography variant="h2">
                You owe: {balanceObject.currentDebt}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h2">
                People owe you: {balanceObject.moneyPeopleOwnYou}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
