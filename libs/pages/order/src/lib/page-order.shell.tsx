import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { EditOrder } from '@pasnik/orders/edit-order';
import { Order } from '@pasnik/orders/order';

export const OrderShell = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={Order} />
      <Route path={`${path}/edit`} component={EditOrder} />
    </Switch>
  );
};
