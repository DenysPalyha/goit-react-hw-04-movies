import React, {Suspense} from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../../views/NotFound';
import routes from '../../services/router';
import Navigation from '../Navigation/Navigation';
import Loader from '../Loader/Loader';

const App = () => {
  return (
    <>
    <Suspense fallback={<Loader/>}>
      <Navigation />
      <Switch>
        {
          routes.map(route=> (
            <Route key={route.path}{...route}/>
          ))
        }
        <Route component={NotFound} />
      </Switch>
      </Suspense>
    </>
  );
};

export default App;

