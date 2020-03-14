import React from 'react';

import { Switch } from 'react-router-dom';
import SignIn from '~/pages/SignIn';
import Orders from '~/pages/Orders';
import Couriers from '~/pages/Couriers';
import DeliveryProblems from '~/pages/DeliveryProblems';
import Recipients from '~/pages/Recipients';
import Route from './Route';
import EditOrder from '~/pages/Orders/EditOrder';
import EditCourier from '~/pages/Couriers/EditCourier';
import EditRecipient from '~/pages/Recipients/EditRecipient';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/orders" component={Orders} isPrivate />
      <Route path="/couriers" component={Couriers} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/deliveryproblems" component={DeliveryProblems} isPrivate />
      <Route path="/editorder" component={EditOrder} isPrivate />
      <Route path="/editcourier" component={EditCourier} isPrivate />
      <Route path="/editrecipient" component={EditRecipient} isPrivate />
    </Switch>
  );
}
