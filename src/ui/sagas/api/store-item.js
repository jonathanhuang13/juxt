import request from 'superagent';

export function* fetchItemList(itemIds, storeIds) {
  const itemListRequest = yield request
    .post('http://localhost:3000/storeItems/search/')
    .send({ itemIds, storeIds });

  return (JSON.parse(itemListRequest.text));
}

export function* postStoreItem(payload, storeIds) {
  try {
    const response = yield request
      .post('http://localhost:3000/storeItems/')
      .send({ payload, storeIds });

    return { response: JSON.parse(response.text) };
  } catch (err) {
    return { err };
  }
}

