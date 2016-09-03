import { fromJS, Map } from 'immutable';

const stateString = localStorage.getItem('my-save-key');
const stateObject = JSON.parse(stateString);
const stateImmutable = stateObject ? fromJS(stateObject) : Map({});

export default stateImmutable;
