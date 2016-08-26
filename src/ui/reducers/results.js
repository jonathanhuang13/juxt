import { Map } from 'immutable';

const initialState = Map({
  itemList: null
});

export default function results(state = initialState, action) {
  switch (action.type) {
    case 'SET_STATE':
      return state.setIn([ 'itemList' ], action.state);

    default:
      return state;
  }
}
