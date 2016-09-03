import { fromJS } from 'immutable';

const stateString = localStorage.getItem('my-save-key');
const stateObject = JSON.parse(stateString);

export default fromJS(stateObject);
