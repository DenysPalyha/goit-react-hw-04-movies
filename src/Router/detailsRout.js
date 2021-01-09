import { lazy } from 'react';

const detailsRout = {
  path: '/movies/:movieId',
  exact: false,
  component: lazy(() =>
    import(
      '../pages/MovieDetailsPage.js' /*webpackChunkName: "MoviesDetailsPage"*/
    ),
  ),
};

export default detailsRout;
