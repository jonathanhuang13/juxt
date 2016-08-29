import { combineReducers } from 'redux';
import resultsReducer from './results';
import searchReducer from './search';

export default combineReducers({
  resultsReducer,
  searchReducer,
});
