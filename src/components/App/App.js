import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../../views/HomePage';
import MoviesPageList from '../MoviesPageList/MoviesPageList';
import NotFound from '../../views/NotFound';
import MovieDetailsPage from '../../views/MovieDetailsPage';
import router from '../../services/router';

import Navigation from '../Navigation/Navigation';

const App = () => {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path={router.HOME} exact component={HomePage} />
        <Route path={router.MOVIES} exact component={MoviesPageList} />
        <Route path={router.MOVIESDETAILS} component={MovieDetailsPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
