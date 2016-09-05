import request from 'superagent';

export function* fetchItems(itemNames) {
  if (!itemNames) return [];

  const itemsRequest = yield request.get('http://localhost:3000/items/search/' + itemNames);
  return (JSON.parse(itemsRequest.text));
}

export function* postItem(payload) {
  const itemsResponse = yield request
    .post('http://localhost:3000/items/')
    .send(payload); 

  return (JSON.parse(itemsResponse.text));
}
