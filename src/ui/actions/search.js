import { search } from '../utils/action-types';

const { SUBMIT, SET_SEARCH_ITEMS, SET_SEARCH_STORES } = search;

// These actions are called from containers and caught from saga
export function handleSubmit(itemNames, storeNames) {
  const search = { itemNames, storeNames };
  return { type: SUBMIT, search };
}

// These actions are called from saga
export function setItemSearch(items) {
  return ({ type: SET_SEARCH_ITEMS, items });
}

export function setStoreSearch(stores) {
  return ({ type: SET_SEARCH_STORES, stores });
}
