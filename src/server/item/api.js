import * as valid from './valid';
import Item from '../item';

function getValidator(user) {
  if (user.isSuper) return valid.sup;
  if (user.isAdmin) return valid.admin;

  return valid.user;
}

export async function create(user, payload) {
  const { create } = getValidator(user);
  if (!create) return null;

  const options = {
    method: 'insert',
  };

  return (new Item(payload)).save(null, options);
}

export async function read(user, { id }) {
  const { read } = getValidator(user);

  const options = {
    require: true,
    columns: read.getColumns(),
  };

  return (new Item({ id })).fetch(options);
}

export async function update(user, { id }, payload) {
  const { update } = getValidator(user);
  if (!update) return null;

  const options = {
    method: 'update',
  };

  return (new Item({ id})).save(payload, options);
}

export async function del(user, { id }) {
  const { del } = getValidator(user);
  if (!del) return null;

  return (new Item({ id })).destroy();
}