import type { OrderModel } from '@pasnik/api/data-transfer';
import { OrderStatus } from '@pasnik/api/data-transfer';

import { FC, useEffect, useState } from 'react';
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
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';

const initDate = new Date('2015-03-25T12:00:00Z');

//TODO: replace mockOrder with real order
const mockOrder: OrderModel = {
  createdAt: initDate,
  from: 'Order Name',
  dishes: [
    { name: 'mockDish 1', price: 21 },
    { name: 'mockDish 2', price: 11 },
    { name: 'mockDish 3', price: 38 }],
  id: '',
  //TODO: cents?? really???
  shippingCents: 3,
  menuUrl: '',
  orderedAt: '',
  status: OrderStatus.InProgress,
  updatedAt: initDate,
  user: { email: 'example@example.com' }
};

function Dish(props: { dish: { name: string, price: number } }) {
  return (
    <Grid
      container
      style={{
        paddingTop: '1rem'
      }}
      spacing={2}
      alignItems='baseline'
    >
      <Grid item xs={7} sm={9} style={{ padding: '0' }}>
        <div style={{
          border: '1px #9ca3af solid',
          backgroundColor: 'white',
          borderRadius: '0.125rem',
          fontWeight: 'bolder',
          marginTop: '0.5rem'
        }}>
          <div style={{ marginLeft: '0.2rem', padding: '0.2rem' }}>
            {props.dish.name}
          </div>
        </div>
      </Grid>
      <Grid item xs={1} sm={1}></Grid>
      <Grid item xs={4} sm={2} style={{ paddingTop: '0' }}>
        <div style={{
          border: '1px #9ca3af solid',
          backgroundColor: 'white',
          borderRadius: '0.125rem',
          fontWeight: 'bolder',
          marginTop: '0.5rem'
        }}>
          <div style={{ marginLeft: '0.2rem', padding: '0.2rem' }}>
            {props.dish.price} PLN
          </div>
        </div>
      </Grid>
      <Grid item xs={2} sm={2} style={{ paddingTop: '0' }}>
      </Grid>
    </Grid>


  );
}

function DishList(props: { dishes: { name: string; price: number; }[]; }) {
  return (
    <div style={{ width: '100%', paddingLeft: '1rem' }} className='DishList'>
      {props.dishes.map((dish: { name: string, price: number }) => <Dish key={dish.name} dish={dish}></Dish>)}
    </div>
  );
}

export const OrderDetails: FC = () => {
  const theme = createTheme();
  const [isAddButtonPressed, setIsAddButtonPressed] = useState(false);

  const [order, setOrder] = useState<OrderModel>(mockOrder);

  useEffect(() => {
    //TODO add loading order when getting single order will be available
  }, []);

  const changeAddState = () => {
    setIsAddButtonPressed(!isAddButtonPressed);
  };

  function handleSubmit() {
    return;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main'>
        <CssBaseline />
        <Box
          component='form' noValidate onSubmit={handleSubmit}
          sx={{
            marginTop: 2,
            border: '1px',
            borderStyle: 'solid',
            borderColor: '#9ca3af',
            borderRadius: '0.25rem',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start'
          }}
        >
          <Button variant='text'>
            <Link to={'/'}>&#60;-- Back to list</Link>
          </Button>

          <Grid container spacing={2} alignItems='middle' style={{ paddingTop: '1rem' }}>
            <Grid item style={{ paddingTop: '0' }}>
              <Typography variant='h3'>{order.from}</Typography>
            </Grid>
            <Grid item>
              {order.status === OrderStatus.InProgress ? <Chip label='Order in progress' color='success' />
                : order.status === OrderStatus.Ordered ? <Chip label='Order ordered' color='success' />
                  : <Chip label='Order delivered' color='success' />}

            </Grid>
          </Grid>
          <Typography style={{ paddingTop: '1rem' }} variant='subtitle1'>Shipping Cost: {
            order.shippingCents ? (order.shippingCents + ' PLN') : 'shipping cost is not declared'
          }</Typography>
          <Typography variant='subtitle1'>
            Total: {
            order.dishes.map(dish => dish.price)
              .reduce((a, b) => a + b) + (order.shippingCents ? order.shippingCents : 0)
          } PLN
          </Typography>
          <Typography variant='subtitle1'>Dishes:</Typography>

          <DishList dishes={order.dishes}></DishList>

          {!isAddButtonPressed &&
          <div style={{ paddingTop: '1rem' }}>
            <Button variant='contained' onClick={changeAddState}>+ add dish</Button>
          </div>
          }

          {isAddButtonPressed &&
          <Grid
            container
            style={{ paddingTop: '1rem' }}
            spacing={2}
            alignItems='center'
          >
            <Grid item xs={3}>
              <TextField id='outlined-basic' label='Enter dish name' variant='outlined' size='small' />
            </Grid>
            <Grid item xs={2}>
              <TextField id='outlined-basic2' label='Price' variant='outlined' size='small' />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='contained'>Save</Button>
              <Button variant='contained' onClick={changeAddState} style={{ marginLeft: '1rem' }}>Cancel</Button>
            </Grid>
          </Grid>
          }

        </Box>
      </Container>
    </ThemeProvider>
  );
};
