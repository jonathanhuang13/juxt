import { put, take, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import uuid from 'node-uuid';
import { uuidUnparse } from '../../utils/uuid-parser';

import * as actions from '../utils/action-types';
import * as itemFormAction from '../actions/item-form';

import * as itemApi from './api/item';
import * as storeItemApi from './api/store-item';

export function* addItem() {
  while (true) {
    const { info } = yield take(actions.itemForm.SUBMIT);
    const { title, brand, price, amount, units, storeId } = info;

    if (!title || !storeId) {
      yield put(itemFormAction.failedSubmit());
      continue;
    }

    // Dispatch that you're saving the item
    yield put(itemFormAction.loadingSubmit());

    // Post the item
    const itemId      = uuid.v4();
    const itemPayload = { id: itemId, title, brand };

    const item = yield itemApi.postItem(itemPayload);

    // Post the item-store to the join table
    const payload  = { item_id: item.id, price, amount, units };
    const storeIds = [ uuidUnparse(storeId) ];

    const { response, err } = yield storeItemApi.postStoreItem(payload, storeIds);

    if (response) {
      if (response.duplicates.length > 0) {
        yield put(itemFormAction.duplicateSubmit(response.duplicates));
      } else {
        yield put(itemFormAction.finishedSubmit());
      }
    } else {
      yield put(itemFormAction.failedSubmit());
    }
  }
}
