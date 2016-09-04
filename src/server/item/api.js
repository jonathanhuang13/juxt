import * as valid from './valid';
import { Item } from '../book';

function getValidator(user) {
  if (user && user.isSuper) return valid.sup;
  if (user && user.isAdmin) return valid.admin;

  return valid.user;
}

export async function create(user, payload) {
  const { create } = getValidator(user);
  if (!create) return null;

  const { title, brand } = payload;
  const existingItem     = await readByTitleBrand(user, { title, brand });

  if (existingItem) return existingItem;

  const options = {
    method: 'insert',
  };

  return (new Item(payload)).save(null, options);
}

export async function readAll(user) {
  const { read } = getValidator(user);

  const options = {
    require: true,
    columns: read.getColumns(),
  };

  const items = await Item.fetchAll(options);
  return items;
}

export async function read(user, { id }) {
  const { read } = getValidator(user);

  const options = {
    require: true,
    columns: read.getColumns(),
  };

  return (new Item({ id })).fetch(options);
}

export async function readByTitleBrand(user, { title, brand }) {
  const { read } = getValidator(user);

  const options = {
    columns: read.getColumns(),
  };

  return (new Item({ title, brand })).fetch(options);
}

export async function search(user, term) {
  const { read } = getValidator(user);

  const options = {
    columns: read.getColumns(),
  }

  return (Item.query('where', 'title', 'LIKE', '%' + term + '%')).fetchAll(options);
}

export async function update(user, { id }, payload) {
  const { update } = getValidator(user);
  if (!update) return null;

  const options = {
    method: 'update',
  };

  return (new Item({ id })).save(payload, options);
}

export async function del(user, { id }) {
  const { del } = getValidator(user);
  if (!del) return null;

  return (new Item({ id })).destroy();
}
