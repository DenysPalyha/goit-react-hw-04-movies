import React, { Suspense } from 'react';
import Loader from '../Loader/Loader';
import { NavLink } from 'react-router-dom';
import mainRouters from '../../Router/mainRouters';
import styles from './NavigationMainLink.module.scss';
import './Active.module.scss';

const navigationLink = {
  fontSize: '20px',
  padding: '20px',
  textDecoration: 'none',
  fontWeight: 800,
  color: '#382323',
};

const NavigationMainLink = () => {
  return (
    <ul className={styles.navigationiItem}>
      <Suspense fallback={<Loader />}>
        {mainRouters.map(router => (
          <li key={router.path}>
            <NavLink
              key={router.path}
              to={router.path}
              style={navigationLink}
              activeClassName="activ"
              className="link"
            >
              {router.name}
            </NavLink>
          </li>
        ))}
      </Suspense>
    </ul>
  );
};

export default NavigationMainLink;
