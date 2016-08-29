import React from 'react';
import { Route } from 'react-router';

import App from './containers/app';
import HomeContainer from './containers/home';
import ResultsContainer from './containers/results';

export default (
  <Route component={ App }>
    <Route path='/' component={ HomeContainer } />
    <Route path='/results' component={ ResultsContainer } />
  </Route>
)
