import React from 'react';
import Layout from '../Layout/Layout';
import NavigationMainRouters from '../Navigation/NavigationMainRouters';
import NavigationMainLink from '../Navigation/NavigationMainLink';

const App = () => {
  return(
    <Layout>
      <NavigationMainLink/>
      <NavigationMainRouters/>
    </Layout>
  )
}

export default App;