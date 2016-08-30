require('babel-core/register');
require('babel-polyfill');
require('bootstrap/dist/css/bootstrap.css');
require('./assets/styles.less');

import ReactDOM from 'react-dom';
import React from 'react';
import { Route, Router, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

import reducer from './reducers';
import routes from './routes'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

async function start() {
  //const foo = await fetch('http://localhost:3000/').then(r => r.json());
  ReactDOM.render(
  <Provider store={ store }>
    <Router history={ hashHistory }>
      { routes }
    </Router>
  </Provider>,
  document.getElementById('main'));
}

start();
