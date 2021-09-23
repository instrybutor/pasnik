import { Grid, styled, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function OrderElement(props: {
  order: OrderModel;
  index: number;
}) {
  const { order, index } = props;
  const Tile = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    elevation: 24,
  }));
  const routeChange = (menuUrl: string) => {
    window.open(menuUrl, '_blank');
  };

  const StyledTextField = styled(TextField)`
    .MuiOutlinedInput-input {
      cursor: pointer;
    }
  `;
  return (
    <Fragment key={index}>
      <Grid container direction="row">
        <Grid item xs={9} direction="column">
          <Tile>
            <Typography variant="h5" color="initial" display="block">
              <Link to={`/order/${order.id}`}>{order.from}</Link>
            </Typography>
            <Typography variant="h6" color="initial" display="block">
              <span
                onClick={(event) => {
                  event.stopPropagation();
                  return routeChange(order.menuUrl);
                }}
              >
                {order.menuUrl}
              </span>
            </Typography>
            <Typography variant="overline" color="initial" display="block">
              {order.user} User is empty (bug)
            </Typography>
          </Tile>
        </Grid>
        <Grid item xs={3} direction="column">
          <Box>
            <StyledTextField
              inputProps={{
                readOnly: true,
              }}
              label="ORDER STATUS"
              color={
                order.status === 0
                  ? 'primary'
                  : order.status === 1
                  ? 'warning'
                  : 'success'
              }
              focused
              defaultValue={OrderStatus[order.status]}
            />
            <Typography variant="overline" color="initial" display="block">
              Created: {order.createdAt}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
}
