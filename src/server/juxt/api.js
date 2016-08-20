import { knex } from '../book';
import * as itemApi from '../item/api';
import * as storeApi from '../store/api';

export async function getItem(user, itemId, storeIds) {
  // Get the item and turn it into json format
  var item = await itemApi.read(user, { id: itemId });
  item = item.toJSON();
  item.stores = [];

  if (storeIds == null) {
    storeIds = await knex('stores').select('id');
    storeIds = storeIds.map((storeId) => storeId.id);
  }

  // Iterate through all storeIds
  for (const storeId of storeIds) {
    const query = { item_id: itemId, store_id: storeId };

    // Get each store's json format
    const entries = await knex('items_stores').where(query);

    if (entries.length > 0) {
      const store = await storeApi.read(user, { id: entries[0].store_id });

      // Add it to the json object
      item.stores.push(store.toJSON());
    }
  }

  return item;
} 

export async function getItems(user, itemIds, storeIds) {
  var items = [];

  if (itemIds == null) {
    itemIds = [];

    // Only get item ids that correspond to at least
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
