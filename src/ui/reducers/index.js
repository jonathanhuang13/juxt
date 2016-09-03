import { combineReducers } from 'redux-immutable';
import * as storage from 'redux-storage';
import merger from 'redux-storage-merger-immutablejs';
import resultsReducer from './results';
import searchReducer from './search';
import itemFormReducer from './item-form';

export default storage.reducer(combineReducers({
  resultsReducer,
  searchReducer,
  itemFormReducer,
}), merger);
