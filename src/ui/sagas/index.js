import { fork } from 'redux-saga/effects';
import { setSearch } from './search';

export default function* root() {
  yield [
    fork(setSearch)
  ]
}
