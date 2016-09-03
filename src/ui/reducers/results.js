import { Map, List, fromJS } from 'immutable';
import { results } from '../utils/action-types';
import localStorage from '../utils/local-storage';

const { SET_STATE } = results;

const initialState = Map({
  itemList: localStorage.getIn([ 'resultsReducer', 'itemList' ]) || List()
});

export default function resultsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATE:
      return state.set('itemList', fromJS(action.state));

    default:
      return state;
  }
}
