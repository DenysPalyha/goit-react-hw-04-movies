import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from '../Loader/Loader';
import mainRouters from '../../Router/mainRouters';
import NotFound from '../../pages/NotFound';
import detailsRout from '../../Router/detailsRout';

const NavigationMainRouters = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {mainRouters.map(router => (
          <Route
            key={router.path}
            path={router.path}
            exact={router.exact}
            component={router.component}
          />
        ))}
        <Route
          path={detailsRout.path}
          exact={detailsRout.exact}
          component={detailsRout.component}
        />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default NavigationMainRouters;
