import { Map, fromJS } from 'immutable';
import { search } from '../utils/action-types';
import localStorage from '../utils/local-storage';

const { SET_SEARCH_ITEMS, SET_SEARCH_STORES } = search;

const initialState = Map({
  searchedItems:   localStorage.getIn([ 'searchReducer', 'searchedItems' ]) || null,
  searchedStores:  localStorage.getIn([ 'searchReducer', 'searchedStores' ]) || null
});

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_ITEMS:
      return state.set('searchedItems', fromJS(action.items)); 

    case SET_SEARCH_STORES:
      return state.set('searchedStores', fromJS(action.stores));

    default:
      return state;
  }
}
