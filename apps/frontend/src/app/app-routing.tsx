import { PagesDashboard } from '@pasnik/pages/dashboard';
import { PagesOrder } from '@pasnik/pages/order';
import { Layout } from '@pasnik/layout';
import { PagesOrders } from '@pasnik/pages/orders';
import { CreateOrder } from '@pasnik/orders/create-order';
import { EditOrder } from '@pasnik/orders/edit-order';
import { Route, Switch } from 'react-router-dom';

export const AppRouting = () => {
  const version = process.env.NX_VERSION;

  return (
    <Layout version={version}>
      <Switch>
        <Route exact path="/" component={PagesDashboard} />
        <Route path="/create-order" component={CreateOrder} />
        <Route path="/history" component={PagesOrders} />
        <Route path="/order/:slug" component={PagesOrder} />
        <Route path="/order/:slug/edit" component={EditOrder} />
      </Switch>
    </Layout>
  );
};
