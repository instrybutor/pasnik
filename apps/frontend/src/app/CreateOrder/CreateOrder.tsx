import { FC, useState } from 'react';
import { Button, Grid, Input, makeStyles, Paper, Snackbar } from '@material-ui/core';
import { CreateOrderService } from './CreateOrder.service';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { CreateOrderDto } from '@pasnik/api/data-transfer';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  container: {
    padding: '10px'
  },
  formContainer: {
    flexDirection: 'column',
    padding: '5px',
  },
  orderForm: {
    margin: '0 auto',
    width: '100%',
    "& input": {
      marginTop: '10px',
      marginBottom: '10px'
    }
  },
  footer: {
    "& button": {
      marginTop: '10px'
    }
  }
}));

export const CreateOrder: FC = () => {
  const { register, handleSubmit } = useForm();
  const [ error, setError ] = useState<string | null>(null);
  const history = useHistory();
  const classes = useStyles();
  const service = CreateOrderService();

  const onSubmit = (data: CreateOrderDto) => {
    service
      .createOrder({ ...data, orderAt: new Date().toISOString() })
      .then(result => history.push('/'))
      .catch((err: Error) => {
        setError(err.message);
      });
  }

  const clearError = () => {
    setError(null);
  }

  return (
    <Grid className={classes.root}>
      <Grid xs={12} md={6} item className={classes.orderForm}>
        <Paper className={classes.container}>
            <Snackbar color={'secondary'} open={!!error} autoHideDuration={3000} onClose={clearError}>
              <Alert severity='error'>{error}</Alert>
            </Snackbar>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container justifyContent="flex-start" className={classes.formContainer}>
                  <Grid item>
                    <Input fullWidth={true} {...register('from')} placeholder='Restaurant name'/>
                  </Grid>
                  <Grid item>
                    <Input fullWidth={true} {...register('menuUrl')} placeholder='Menu URL'/>
                  </Grid>
                  <Grid item>
                    <Input placeholder='Delivery cost' {...register('shippingCents')} type="number"/>
                  </Grid>
              </Grid>
              <Grid container justifyContent='flex-end' className={classes.footer}>
                <Grid item>
                  <Button type="submit" variant='contained' color="primary">Create order</Button>
                </Grid>
              </Grid>
            </form>
        </Paper>
      </Grid>
    </Grid>
  )
}
