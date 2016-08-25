import React from 'react';
import { Route } from 'react-router';

import App from './components/app';
import Home from './components/home';
import ItemList from './components/item_list';

export default (
  <Route component={ App }>
    <Route path='/' component={ Home } />
    <Route path='/results' component={ ItemList } />
  </Route>
)
