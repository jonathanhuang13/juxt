require('babel-core/register');
require('babel-polyfill');
require('bootstrap/dist/css/bootstrap.css');
require('./css/styles.less');

import ReactDOM from 'react-dom';
import React from 'react';
import { Route, Router, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import sagas from './sagas';
import reducer from './reducers';
import routes from './routes';

import createSagaMiddleware from 'redux-saga';
import { storageMiddleware, loadStore } from './middleware/reduxStorage';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(storageMiddleware, sagaMiddleware)
);

function loadMiddleware() {
  loadStore(store);
  sagaMiddleware.run(sagas);
}

function start() {
  ReactDOM.render(
  <Provider store={ store }>
    <Router history={ hashHistory }>
      { routes }
    </Router>
  </Provider>,
  document.getElementById('main'));
}

loadMiddleware();
start();
