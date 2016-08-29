import request from 'superagent';
import { put, take } from 'redux-saga/effects';
import * as actions  from './constants/actionTypes';

export function* getItems() {
  while (true) {
    const { search } = yield take(actions.search.SUBMIT);
    const { itemNames, storeNames } = search;

    const a = yield request.get('http://localhost:3000/items');
    console.log(JSON.parse(a.text));
  }
}
