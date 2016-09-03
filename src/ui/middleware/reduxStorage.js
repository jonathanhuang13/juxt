import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';

const engine = createEngine('my-save-key');
const storageMiddleware = storage.createMiddleware(engine);
const load = storage.createLoader(engine);

function loadStore(store) {
  load(store);
}

export { storageMiddleware, loadStore };
