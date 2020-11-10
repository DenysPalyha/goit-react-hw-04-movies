import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

const NavigationLink ={
   color: "#000"
}

const Navigation = () => {
   return(
      <ul className={styles["navigation-item"]}>
      <li>
        <NavLink
        exact
        to="/"
        className={styles["NavLink"]}
        style={NavigationLink}
      activeStyle={{
         fontWeight: "bold",
         color: "red"
       }}
        >
           Home
        </NavLink>
      </li>
      <li>
        <NavLink
        to="/movies"
        className={styles["NavLink"]}
      style={NavigationLink}
      activeStyle={{
         fontWeight: "bold",
         color: "red"
       }}
        >
           Movies
        </NavLink>
      </li>
    </ul>
   )
}



export default Navigation;
