import request from 'superagent';
import { put, take } from 'redux-saga/effects';
import * as actions  from '../constants/actionTypes';
import * as searchActions from '../actions/search';

function* fetchItems(itemNames) {
    const itemsRequest = yield request.get('http://localhost:3000/items/search/' + itemNames);
    return (JSON.parse(itemsRequest.text));
}

function* fetchStores(storeNames) {
    const storesRequest = yield request.get('http://localhost:3000/stores/search/' + storeNames);
    return (JSON.parse(storesRequest.text));
}

export function* setSearch() {
  while (true) {
    const { search } = yield take(actions.search.SUBMIT);
    const { itemNames, storeNames, route } = search;

    const items  = yield fetchItems(itemNames);
    const stores = yield fetchStores(storeNames);

    yield put(searchActions.setItemSearch(items));
    yield put(searchActions.setStoreSearch(stores));
  }
}

