import request from 'superagent';
import { put, take } from 'redux-saga/effects';
import * as actions  from '../utils/action-types';
import * as searchActions from '../actions/search';
import * as resultsActions from '../actions/results';

function* fetchItems(itemNames) {
  const itemsRequest = yield request.get('http://localhost:3000/items/search/' + itemNames);
  return (JSON.parse(itemsRequest.text));
}

function* fetchStoresByName(storeNames) {
  const storesRequest = yield request.get('http://localhost:3000/stores/search/' + storeNames);
  return (JSON.parse(storesRequest.text));
}

function* fetchStoreById(storeId) {
  const storeRequest = yield request.get('http://localhost:3000/stores/' + storeId);
  return (JSON.parse(storeRequest.text)); 
}

function* fetchItemList(itemIds, storeIds) {
  const itemListRequest = yield request
    .post('http://localhost:3000/storeItems/search/')
    .send({ itemIds, storeIds });

  return (JSON.parse(itemListRequest.text));
}

export function* setSearch() {
  while (true) {
    const { search } = yield take(actions.search.SUBMIT);
    const { itemNames, storeNames, route } = search;

    var items  = yield fetchItems(itemNames);
    var stores = yield fetchStoreById(storeNames);

    // TODO: Do I want to enforce an array?
    if (!Array.isArray(items)) {  // Don't think this one is necessasry
      items = [ items ];
    }

    if (!Array.isArray(stores)) {
      stores = [ stores ];
    }

    yield put(searchActions.setItemSearch(items));
    yield put(searchActions.setStoreSearch(stores));

    // Get array of itemIds and storeIds
    const itemIds  = items.map((item) => { return item.id });
    const storeIds = stores.map((store) => { return store.id });

    const itemList = yield fetchItemList(itemIds, storeIds);
    console.log('search saga itemList: ', itemList);

    // Dispatch to state
    yield put(resultsActions.setSearch(itemList));
  }
}
