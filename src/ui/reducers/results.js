import { Map } from 'immutable';
import { results } from '../constants/actionTypes';

const { SET_STATE } = results;

const initialState = Map({
  itemList: null
});

export default function resultsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATE:
      return state.setIn([ 'itemList' ], action.state);

    default:
      return state;
  }
}
