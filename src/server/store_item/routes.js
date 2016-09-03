import { uuidUnparse } from '../../../constants/uuid-parser';
import * as StoreItemController from './api';

const router = require('koa-router')();
const user = { name: 'Jonathan', isSuper: 'true' };

router
.get('/', async (ctx) => {
  const storeItems = await StoreItemController.readAll(user);
  ctx.body = storeItems;
})

// TODO: is there a way to use GET and have superagent send a body?
.post('/search', async (ctx) => {
  const itemIds  = ctx.request.body.itemIds;
  const storeIds = ctx.request.body.storeIds;

  const storeItems = await StoreItemController.getItems(user, itemIds, storeIds);
  ctx.body = storeItems;
})

.put('/', async (ctx) => {
  const payload  = ctx.request.body.payload;
  const storeIds = ctx.request.body.storeIds;

  const storeItems = await StoreItemController.updateItem(user, payload, storeIds);
  ctx.body = storeItems;
})

.post('/', async (ctx) => {
  const payload  = ctx.request.body.payload;
  const storeIds = ctx.request.body.storeIds;

  const storeItems = await StoreItemController.createItem(user, payload, storeIds);
  ctx.body = storeItems;
})

.del('/:item_id/store_id', async (ctx) => {
  const itemId  = uuidUnparse(ctx.params.item_id);
  const storeId = uuidUnparse(ctx.params.store_id);

  const storeItem = await StoreItemController.del(user, { item_id: itemId, store_id: storeid });
  ctx.body = storeItems; 
})

export { router };
