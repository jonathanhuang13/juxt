import { Map, fromJS } from 'immutable';
import { results } from '../constants/actionTypes';

const { SET_STATE } = results;

const initialState = Map({
  itemList: null
});

export default function resultsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATE:
      return state.set('itemList', fromJS(action.state));

    default:
      return state;
  }
}
