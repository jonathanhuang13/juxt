import * as valid from './valid';
import { Item } from '../book';

function getValidator(user) {
  if (user.isSuper) return valid.sup;
  if (user.isAdmin) return valid.admin;

  return valid.user;
}

export async function create(user, payload) {
  const { create } = getValidator(user);
  if (!create) return null;
  if (!payload.store_ids) return null;

  const options = {
    method: 'insert',
  };

  const store_ids = payload.store_ids;
  delete payload.store_ids;

  var item = await new Item(payload).save(null, options);
  await item.stores().attach(store_ids);

  return item;
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

export async function update(user, { id }, payload) {
  const { update } = getValidator(user);
  if (!update) return null;

  const options = {
    method: 'update',
  };

  if (!payload.store_ids) {
    return (new Item({ id })).save(payload, options);
  } else {
    const store_ids = payload.store_ids;
    delete payload.store_ids;


    var item = await new Item({ id }).save(payload, options);
    await item.stores().attach(store_ids);

    return item;
  }
}

export async function del(user, { id }) {
  const { del } = getValidator(user);
  if (!del) return null;

  return (new Item({ id })).destroy();
}
