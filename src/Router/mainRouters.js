import { lazy } from 'react';

const mainRouters = [
  {
    path: '/',
    exact: true,
    name: 'Home',
    component: lazy(() =>
      import('../pages/HomePage.js' /*webpackChunkName: "HomePage"*/),
    ),
  },
  {
    path: '/movies',
    exact: true,
    name: 'Movies',
    component: lazy(() =>
      import('../pages/MoviesPage.js' /*webpackChunkName: "MoviesPage"*/),
    ),
  },
];

export default mainRouters;
