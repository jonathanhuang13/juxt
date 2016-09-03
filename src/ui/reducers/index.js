import { combineReducers } from 'redux-immutable';
import resultsReducer from './results';
import searchReducer from './search';
import itemFormReducer from './item-form';

export default combineReducers({
  resultsReducer,
  searchReducer,
  itemFormReducer,
});
