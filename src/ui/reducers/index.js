import { combineReducers } from 'redux';
import resultsReducer from './results';
import searchReducer from './search';
import itemFormReducer from './item_form';

export default combineReducers({
  resultsReducer,
  searchReducer,
  itemFormReducer,
});
