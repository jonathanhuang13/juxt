import { uuidUnparse } from '../../../constants/uuid-parser';
import * as JuxtController from './api';

const router = require('koa-router')();
const user = { name: 'Jonathan', isSuper: 'true' };

router
.get('/', async (ctx) => {
  const itemIds  = ctx.params.item_ids;
  const storeIds = ctx.params.store_ids;

  const items = await JuxtController.getItems(user, itemIds, storeIds);
  ctx.body = items;
})

export { router };
