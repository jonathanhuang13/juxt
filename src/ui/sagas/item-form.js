import request from 'superagent';
import { put, take, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import uuid from 'node-uuid';
import { uuidUnparse } from '../../utils/uuid-parser';

import * as actions from '../utils/action-types';
import * as itemFormAction from '../actions/item-form';

function* postItem(payload) {
  const itemsResponse = yield request
    .post('http://localhost:3000/items/')
    .send(payload); 

  return (JSON.parse(itemsResponse.text));
}

function* postStoreItem(payload, storeIds) {
  try {
    const response = yield request
      .post('http://localhost:3000/storeItems/')
      .send({ payload, storeIds });

    return { response: JSON.parse(response.text) };
  } catch (err) {
    return { err };
  }
}

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

    const item = yield postItem(itemPayload);

    // Post the item-store to the join table
    const payload  = { item_id: item.id, price, amount, units };
    const storeIds = [ uuidUnparse(storeId) ];

    const { response, err } = yield postStoreItem(payload, storeIds);

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
