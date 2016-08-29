import { Map } from 'immutable';
import { search } from '../constants/actionTypes';

const initialState = Map({
});

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
