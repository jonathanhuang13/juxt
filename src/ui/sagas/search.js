import { put, take } from 'redux-saga/effects';

import * as actions  from '../utils/action-types';
import * as searchActions from '../actions/search';
import * as resultsActions from '../actions/results';

import * as itemApi from './api/item';
import * as storeApi from'./api/store';
import * as storeItemApi from './api/store-item';

export function* setSearch() {
  while (true) {
    const { search } = yield take(actions.search.SUBMIT);
    const { itemNames, storeNames, route } = search;

    var items  = yield itemApi.fetchItems(itemNames);
    var stores = null;

    if (!storeNames) {
      stores = yield storeApi.fetchAllStores();
    } else {
      stores = yield storeApi.fetchStoreById(storeNames);
    }

    yield put(searchActions.setItemSearch(items));
    yield put(searchActions.setStoreSearch(stores));

    // Get array of itemIds and storeIds
    const itemIds  = items.map((item) => { return item.id });
    const storeIds = stores.map((store) => { return store.id });

    const itemList = yield storeItemApi.fetchItemList(itemIds, storeIds);
    console.log('search saga itemList: ', itemList);

    // Dispatch to state
    yield put(resultsActions.setSearch(itemList));
  }
}
