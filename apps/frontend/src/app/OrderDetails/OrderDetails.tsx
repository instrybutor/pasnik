import type { OrderModel } from '@pasnik/api/data-transfer';
import { DishModel, OrderStatus } from '@pasnik/api/data-transfer';

import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';

const theme = createTheme();
const initDate = new Date('2015-03-25T12:00:00Z');

type ChipProps = React.ComponentProps<typeof Chip>;

//TODO: replace mockOrder with real order
const mockOrder: OrderModel = {
  createdAt: initDate,
  from: 'Order Name',
  dishes: [
    { name: 'mockDish 1', priceCents: 2150 },
    { name: 'mockDish 2', priceCents: 1030 },
    { name: 'mockDish 3', priceCents: 3820 },
  ],
  id: '',
  shippingCents: 300,
  menuUrl: 'example.com',
  orderedAt: '',
  status: OrderStatus.InProgress,
  updatedAt: initDate,
  user: { email: 'example@example.com' },
};

function OrderElements(props: OrderProps) {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      style={{ paddingTop: '1rem' }}
    >
      <Grid item xs={6} sm={6} style={{ paddingTop: '0' }}>
        <Typography variant="h3">{props.order.from}</Typography>
      </Grid>
      <Grid item xs={6} sm={6} style={{ paddingTop: '0' }}>
        <OrderStatusChip status={props.order.status} />
      </Grid>
      <Grid item xs={12} sm={6} style={{ paddingTop: '0' }}>
        <Typography style={{ paddingTop: '0' }} variant="subtitle1">
          Ordered by: {props.order.user.email}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} style={{ paddingTop: '0' }}>
        <Typography style={{ paddingTop: '0' }} variant="subtitle1">
          Menu url: {props.order.menuUrl}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} style={{ paddingTop: '0' }}>
        <Typography style={{ paddingTop: '0' }} variant="subtitle1">
          Shipping cost:{' '}
          {props.order.shippingCents
            ? PriceFormatter(props.order.shippingCents)
            : 'shipping cost is not declared'}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} style={{ paddingTop: '0' }}>
        <Typography variant="subtitle1">
          Total:{' '}
          {props.order.shippingCents &&
            PriceFormatter(
              props.order.shippingCents,
              props.order.dishes.map((dish) => (dish as DishModel).priceCents)
            )}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} style={{ paddingTop: '0' }}>
        <Typography style={{ paddingTop: '0' }} variant="subtitle1">
          Creation date: {props.order.createdAt.toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} style={{ paddingTop: '0' }}>
        <Typography style={{ paddingTop: '0' }} variant="subtitle1">
          Update date: {props.order.updatedAt.toLocaleDateString()}
        </Typography>
      </Grid>
    </Grid>
  );
}

function OrderStatusChip(props: OrderStatusProps) {
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<ChipProps['color']>('error');

  useEffect(() => {
    switch (props.status) {
      case OrderStatus.InProgress:
        setName('Order in progress');
        setColor('success');
        break;
      case OrderStatus.Delivered:
        setName('Order in progress');
        setColor('success');
        break;
      case OrderStatus.Ordered:
        setName('Order in progress');
        setColor('success');
        break;
    }
  }, [props.status]);

  return <Chip label={name} color={color} />;
}

function Dish(props: DishProps) {
  return (
    <Grid
      container
      style={{
        paddingTop: '1rem',
      }}
      spacing={2}
      alignItems="baseline"
      justifyContent="space-between"
    >
      <Grid item xs={8} sm={9} style={{ padding: '0' }}>
        <div
          style={{
            border: '1px #9ca3af solid',
            backgroundColor: 'white',
            borderRadius: '0.125rem',
            fontWeight: 'bolder',
            marginTop: '0.5rem',
          }}
        >
          <div style={{ marginLeft: '0.2rem', padding: '0.2rem' }}>
            {props.dish.name}
          </div>
        </div>
      </Grid>
      <Grid item xs={4} sm={3} style={{ paddingTop: '0' }}>
        <div
          style={{
            border: '1px #9ca3af solid',
            backgroundColor: 'white',
            borderRadius: '0.125rem',
            fontWeight: 'bolder',
            marginTop: '0.5rem',
          }}
        >
          <div style={{ marginLeft: '0.2rem', padding: '0.2rem' }}>
            {PriceFormatter(props.dish.priceCents)}
          </div>
        </div>
      </Grid>
      <Grid item xs={2} sm={2} style={{ paddingTop: '0' }}></Grid>
    </Grid>
  );
}

function DishList(props: DishesProps) {
  return (
    <div style={{ width: '100%', paddingLeft: '1rem' }} className="DishList">
      {props.dishes.map((dish: DishModel) => (
        <Dish key={dish.name} dish={dish} />
      ))}
    </div>
  );
}

export const OrderDetails: FC = () => {
  const [isAddButtonPressed, setIsAddButtonPressed] = useState(false);

  const [order] = useState<OrderModel>(mockOrder);

  useEffect(() => {
    //TODO add loading order when getting single order will be available
  }, []);

  const changeAddState = useCallback(() => {
    setIsAddButtonPressed(!isAddButtonPressed);
  }, [isAddButtonPressed]);

  function handleSubmit() {
    return;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            marginTop: 2,
            border: '1px',
            borderStyle: 'solid',
            borderColor: '#9ca3af',
            borderRadius: '0.25rem',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Button variant="text">
            <Link to={'/'}>&#60;-- Back to list</Link>
          </Button>

          <OrderElements order={order} />

          <Typography variant="h4" style={{ paddingTop: '1rem' }}>
            Dishes:
          </Typography>

          <DishList dishes={order.dishes as DishModel[]} />

          {!isAddButtonPressed && (
            <div style={{ paddingTop: '1rem' }}>
              <Button variant="contained" onClick={changeAddState}>
                + add dish
              </Button>
            </div>
          )}

          {isAddButtonPressed && (
            <Grid
              container
              style={{ paddingTop: '1rem' }}
              spacing={2}
              alignItems="center"
            >
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Enter dish name"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="outlined-basic2"
                  label="Price"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={3} />
              <Grid
                item
                xs={4}
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <Button variant="contained">Save</Button>
                <Button
                  variant="contained"
                  onClick={changeAddState}
                  style={{ marginLeft: '1rem' }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

function PriceFormatter(singleNumber: number, otherNumbers?: number[]) {
  let numberString: number;
  if (!otherNumbers) numberString = singleNumber / 100;
  else
    numberString = (otherNumbers.reduce((a, b) => a + b) + singleNumber) / 100;
  return Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  }).format(numberString);
}

interface OrderProps {
  order: OrderModel;
}

interface OrderStatusProps {
  status: OrderStatus;
}

interface DishProps {
  dish: DishModel;
}

interface DishesProps {
  dishes: DishModel[];
}
