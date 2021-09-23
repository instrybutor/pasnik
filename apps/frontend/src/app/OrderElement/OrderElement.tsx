import { Grid, styled, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-input {
    cursor: pointer;
  }
`;

export default function OrderElement(props: { order: OrderModel }) {
  const order = props.order;
  const statusColor =
    order.status === 0 ? 'primary' : order.status === 1 ? 'warning' : 'success';
  const redirectToLink = useCallback(
    (event) => {
      event.stopPropagation();
      window.open(order.menuUrl, '_blank');
    },
    [order.menuUrl]
  );
  return (
    <Grid container direction="row">
      <Grid item xs={9} direction="column">
        <Typography variant="h5" color="initial" display="block">
          <Link to={`/order/${order.id}`}>{order.from}</Link>
        </Typography>
        <Typography variant="h6" color="initial" display="block">
          <span onClick={(event) => redirectToLink(event)}>
            {order.menuUrl}
          </span>
        </Typography>
        <Typography variant="overline" color="initial" display="block">
          {order.user ? order.user : 'User is not declared (bug)'}
        </Typography>
      </Grid>
      <Grid item xs={3} direction="column">
        <Box>
          <StyledTextField
            inputProps={{
              readOnly: true,
            }}
            label="ORDER STATUS"
            color={statusColor}
            focused
            defaultValue={OrderStatus[order.status]}
          />
          <Typography variant="overline" color="initial" display="block">
            Created: {order.createdAt}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
