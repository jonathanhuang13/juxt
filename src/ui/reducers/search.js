import { Map } from 'immutable';
import { search } from '../constants/actionTypes';

const { SET_SEARCH_ITEMS, SET_SEARCH_STORES } = search;

const initialState = Map({
  searchedItems: null,
  searchedStores: null
});

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_ITEMS:
      return state.setIn([ 'searchedItems' ], action.items); 

    case SET_SEARCH_STORES:
      return state.setIn([ 'searchedStores' ], action.stores);

    default:
      return state;
  }
}
