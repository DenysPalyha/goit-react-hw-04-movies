import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from '../Loader/Loader';
import mainRouters from '../../Router/mainRouters';
import NotFound from '../../pages/NotFound';


const NavigationMainRouters = () =>{
  return(
    <Suspense fallback={<Loader/>}>
      <Switch>
        {mainRouters.map(router => (
          <Route 
          key={router.path}
          path={router.path}
          exact={router.exact}
          component={router.component}
          />
        ))}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  )
}

export default NavigationMainRouters;


// import React, { Suspense } from 'react';
// import { Switch, Route } from 'react-router-dom';
// import mainRouters from '../../Router/mainRouters';
// import Loader from '../Loader/Loader';

// const NavigationMainRouters = () => {
//   return (
//     <Suspense fallback={<Loader />}>
//       <Switch>
//           {mainRouters.map(router => (
//               <Route 
//               key={router.path}
//               to={router.path} 
//               exact={router.exact} 
//               component={router.component}
//               />
              
//           ))}
//       </Switch>
//     </Suspense>
//   );
// };

// export default NavigationMainRouters;
