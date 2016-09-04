import { Map, List, fromJS } from 'immutable';
import { itemForm } from '../utils/action-types';

const { SHOW_FORM, HIDE_FORM, LOADING, FINISHED_SUBMIT, FAILED_SUBMIT, DUPLICATE_SUBMIT } = itemForm;

const initialState = fromJS({
  loading:       false,
  showItemForm:  false,
  addFailed:     false,
  duplicates:    null,
});

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_FORM:
      return state.set('showItemForm', true); 

    case HIDE_FORM:
      return state.withMutations((state) => { 
        state.set('showItemForm', false)
          .set('addFailed', false)
          .set('duplicates', null);
      });

    case LOADING:
      return state.set('loading', true); 

    case FINISHED_SUBMIT:
      return state.withMutations((state) => {
        state.set('loading', false)
          .set('showItemForm', false)
          .set('addFailed', false)
          .set('duplicates', null);
      });

    case FAILED_SUBMIT:
      return state.withMutations((state) => { 
        state.set('loading', false)
          .set('addFailed', true)
          .set('duplicates', null);
      });

    case DUPLICATE_SUBMIT:
      return state.withMutations((state) => {
        state.set('loading', false)
          .set('addFailed', false)
          .set('duplicates', List(action.duplicates));
      });

    default:
      return state;
  }
}

