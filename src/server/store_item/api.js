import { knex, StoreItem } from '../book';
import * as valid from './valid';
import * as itemApi from '../item/api';
import * as storeApi from '../store/api';

function getValidator(user) {
  if (user && user.isSuper) return valid.sup;
  if (user && user.isAdmin) return valid.admin;

  return valid.user;
}

export async function create(user, payload) {
  const { create } = getValidator(user);
  if (!create) return null;

  const { item_id, store_id } = payload;
  const existingStoreItem     = await read(user, { item_id, store_id });

  if (existingStoreItem) return { duplicate: existingStoreItem };

  const options = {
    method: 'insert',
  };

  return (new StoreItem(payload)).save(null, options);
}

// Simple read for one row
export async function read(user, { item_id, store_id }) {
  const { read } = getValidator(user);

  const options = {
    columns: read.getColumns(),
  };

  var i = await new StoreItem({ item_id, store_id });
  return (new StoreItem({ item_id, store_id })).fetch(options);
}

export async function readAll(user) {
  const { read } = getValidator(user);

  const options = {
    require: true,
    columns: read.getColumns(),
  };
  
  const items = await StoreItem.fetchAll(options);
  return items;
}

export async function update(user, { item_id, store_id }, payload) {
  const { update } = getValidator(user);
  if (!update) return null;

  const options = {
    method: 'update',
  };

  const query = { item_id, store_id };
  return (new StoreItem().where(query)).save(payload, options);

  // Use the following when Bookshelf supports composite key updating
  // return (new StoreItem({ item_id, store_id })).save(payload, options);
}

export async function del(user, { item_id, store_id }) {
  const { del } = getValidator(user);
  if (!del) return null;

  const query = { item_id, store_id };
  return (new StoreItem().where(query)).destroy();

  // Use the following when Bookshelf supports composite key updating
  // return (new StoreItem({ item_id, store_id })).destroy();
}

// Create item given an array of stores
// TODO: payload must have a valid storeId since it's not-nullable
export async function createItem(user, payload, storeIds) {
  const { create } = getValidator(user);
  if (!create) return null;

  var resp = {
    duplicates: [],
    fails: []
  }
  
  for (const storeId of storeIds) {
    payload.store_id = storeId;
    const storeItem = await this.create(user, payload);

    // Error handling
    if (!storeItem) {
      resp.fails.push(storeId);
    } else if (storeItem.duplicate) {
      resp.duplicates.push(storeId);
    } 
  }

  return resp;
}

// Get items in JSON format given an array of stores
export async function getItem(user, itemId, storeIds) {
  var item = await itemApi.read(user, { id: itemId });
  item = item.toJSON();
  item.stores = [];

  if (storeIds == null) {
    storeIds = await knex('stores').select('id');
    storeIds = storeIds.map((storeId) => storeId.id);
  }

  for (const storeId of storeIds) {
    const query = { item_id: itemId, store_id: storeId };

    const entries = await knex('items_stores').where(query);

    // length should always be equal to 1
    if (entries.length > 0) {
      var store = await storeApi.read(user, { id: entries[0].store_id });

      store = store.toJSON();
      store.price  = entries[0].price;
      store.amount = entries[0].amount;
      store.units   = entries[0].units;

      item.stores.push(store);
    }
  }

  // Sort stores
  const stores = item.stores.sort((a, b) => {return (a.price - b.price)});
  item.stores = stores;

  return item;
} 

// Get items in JSON format given an array of items and store
export async function getItems(user, itemIds, storeIds) {
  var items = [];

  if (itemIds == null) {
    itemIds = [];

    for (const storeId of storeIds) {
      const filteredItemIds = await knex('items_stores').select('item_id').where('store_id', storeId);
      const filteredItemId  = filteredItemIds[0].item_id;

      // TODO: Inefficient
      if (itemIds.indexOf(filteredItemId) === -1) {
        itemIds.push(filteredItemId);
      }
    }
  }

  for (const itemId of itemIds) {
    const item = await getItem(user, itemId, storeIds);
    items.push(item);
  }

  return items;
}

// Update item given an array of stores
// TODO: payload must have a valid storeId since it's not-nullable
export async function updateItem(user, payload, storeIds) {
  const { create } = getValidator(user);
  if (!create) return null;
  
  for (const storeId of storeIds) {
    payload.store_id = storeId;

    const id        = { item_id: payload.item_id, store_id: storeId };
    const storeItem = await this.update(user, id, payload);

    if (!storeItem) return false;
  }

  return true;
}
