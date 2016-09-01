import { Map } from 'immutable';
import { itemForm } from '../constants/actionTypes';

const { SHOW_FORM, HIDE_FORM, LOADING, FINISHED_SUBMIT } = itemForm;

const initialState = Map({
  loading: false,
  showItemForm: false
});

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_FORM:
      return state.setIn([ 'showItemForm' ], true); 

    case HIDE_FORM:
      return state.setIn([ 'showItemForm' ], false); 

    case LOADING:
      console.log('in reducer');
      return state.setIn([ 'loading' ], true); 

    case FINISHED_SUBMIT:
      const newState = state.setIn([ 'showItemForm' ], false);
      return newState.setIn([ 'loading' ], false);

    default:
      return state;
  }
}

