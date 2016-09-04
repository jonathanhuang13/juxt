import * as valid from './valid'; 
import { Store } from '../book';

function getValidator(user) {
  if (user && user.isSuper) return valid.sup;
  if (user && user.isAdmin) return valid.admin;

  return valid.user;
}

export async function create(user, payload) {
  const { create } = getValidator(user);
  if (!create) return null;

  create.validate(payload);

  const options = {
    method: 'insert',
  };

  return (new Store(payload)).save(null, options);
}

export async function readAll(user) {
  const { read } = getValidator(user);

  const options = {
    require: true,
    columns: read.getColumns(),
  };

  const stores = await Store.fetchAll(options);
  return stores;
}

export async function read(user, { id }) {
  const { read } = getValidator(user);

  const options = {
    columns: read.getColumns(),
  };

  return (new Store({ id })).fetch(options);
}

export async function search(user, term) {
  const { read } = getValidator(user);

  const options = {
    columns: read.getColumns(),
  };

  return (Store.query('where', 'name', 'LIKE', '%' + term + '%')).fetchAll(options);
}

export async function update(user, { id }, payload) {
  const { update } = getValidator(user);
  if (!update) return null;

  const options = {
    method: 'update',
  };

  return (new Store({ id })).save(payload, options);
}

export async function del(user, { id }) {
  const { del } = getValidator(user);
  if (!del) return null;

  return (new Store({ id })).destroy();
}
