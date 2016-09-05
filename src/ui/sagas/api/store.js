import request from 'superagent';

export function* fetchAllStores() {
  const storesRequest = yield request.get('http://localhost:3000/stores/');
  return (JSON.parse(storesRequest.text));
}

export function* fetchStoreById(storeId) {
  if (!storeId) return [];

  const storeRequest = yield request.get('http://localhost:3000/stores/' + storeId);
  return ([JSON.parse(storeRequest.text)]); 
}

export function* fetchStoresByName(storeNames) {
  if (!storeNames) return null;

  const storesRequest = yield request.get('http://localhost:3000/stores/search/' + storeNames);
  return (JSON.parse(storesRequest.text));
}

