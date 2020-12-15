import { lazy } from 'react';

export default [
  {
    path: '/',
    lable: 'Home',
    exact: true,
    component: lazy(() =>
      import('../views/HomePage.js' /*webpackChunkName: "HomePage"*/),
    ),
  },
  {
    path: '/movies',
    lable: 'Movies',
    exact: true,
    component: lazy(() =>
      import('../components/MoviesPageList/MoviesPageList.js' /*webpackChunkName: "MoviesPage"*/),
    ),
  },
  {
    path: '/movies/:movieId',
   //  lable: 'MoviesDetailsPage',
    exact: false,
    component: lazy(() =>
      import('../views/MovieDetailsPage.js' /*webpackChunkName: "MoviesDetailsPage"*/),
    ),
  },
];
