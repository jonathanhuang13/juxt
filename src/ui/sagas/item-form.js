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

  return(JSON.parse(itemsResponse.text));
}

function* postStoreItem(payload, storeIds) {
  const response = yield request
    .post('http://localhost:3000/storeItems/')
    .send({ payload, storeIds });

  // TODO: what if it fails?
  return response;
}

export function* addItem() {
  while (true) {
    const { info } = yield take(actions.itemForm.SUBMIT);
    const { title, brand, price, amount, units, storeId } = info;

    // Dispatch that you're saving the item
    yield put(itemFormAction.loadingSubmit());

    // Post the item
    const itemId      = uuid.v4();
    const itemPayload = { id: itemId, title, brand };

    const item = yield postItem(itemPayload);

    // Post the item-store to the join table
    const payload  = { item_id: itemId, price, amount, units };
    const storeIds = [ uuidUnparse(storeId) ];

    yield postStoreItem(payload, storeIds);

    // Dispatch that adding was successful
    yield put(itemFormAction.finishedSubmit());
  }
}
