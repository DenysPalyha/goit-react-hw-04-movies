import { lazy } from 'react';

const infoRouters = [
  {
    path: '/cast',
    exact: true,
    name: 'Cast',
    component: lazy(() =>
      import('../pages/Cast.js' /*webpackChunkName: "Cast"*/),
    ),
  },
  {
    path: '/reviews',
    exact: true,
    name: 'Reviews',
    component: lazy(() =>
      import('../pages/Reviews.js' /*webpackChunkName: "Reviews"*/),
    ),
  },
];

export default infoRouters;
