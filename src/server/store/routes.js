import { uuidUnparse } from '../../../constants/uuid_parser';
import { Store } from '../book';
import * as StoreController from './api';

const router = require('koa-router')();
const user = { name: 'Jonathan', isSuper: 'true' };

router
.get('/', async (ctx) => {
  const store = await StoreController.readAll(user);
  ctx.body = store;
})

.get('/:id', async (ctx) => {
  const id = uuidUnparse(ctx.params.id);

  const store = await StoreController.read(user, { id });
  ctx.body = store;
})

.put ('/:id', async (ctx) => {
  const payload = ctx.request.body;
  const id      = uuidUnparse(ctx.params.id);

  const store = await StoreController.update(user, { id }, payload);
  ctx.body = store;
})

.post('/', async (ctx) => {
  const payload = ctx.request.body;

  const store = await StoreController.create(user, payload);
  ctx.body = store;
})

.del('/:id', async (ctx) => {
  const id = ctx.params.id;

  const store = await StoreController.del(user, { id });
  ctx.body = store;
})

export { router };
