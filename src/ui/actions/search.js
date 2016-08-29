import { search } from '../constants/actionTypes';

const { SUBMIT } = search;

export function handleSubmit(itemNames, storeNames) {
  const search = { itemNames, storeNames };
  return { type: SUBMIT, search };
}
