import { Map, fromJS } from 'immutable';
import { itemForm } from '../utils/action-types';

const { SHOW_FORM, HIDE_FORM, LOADING, FINISHED_SUBMIT } = itemForm;

const initialState = fromJS({
  loading: false,
  showItemForm: false
});

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_FORM:
      return state.set('showItemForm', true); 

    case HIDE_FORM:
      return state.set('showItemForm', false); 

    case LOADING:
      return state.set('loading', true); 

    case FINISHED_SUBMIT:
      const newState = state.set('showItemForm', false);
      return newState.setIn('loading', false);

    default:
      return state;
  }
}

