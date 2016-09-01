import { fork } from 'redux-saga/effects';
import { setSearch } from './search';
import { addItem } from './item_form';

export default function* root() {
  yield [
    fork(setSearch),
    fork(addItem)
  ]
}
