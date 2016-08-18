import { Item } from '../book';
import * as ItemController from './api';

const router = require('koa-router')();
const user = { name: 'Jonathan', isSuper: 'true' };

router
.get('/', async (ctx) => {
  const item = await Item.query();
  ctx.body = item;
})

.get('/:id', async (ctx) => {
  const item = await ItemController.read(user, { id: ctx.params.id });
})

.put ('/:id', async (ctx) => {
  const payload = ctx.request.body;
  const id      = ctx.params.id;

  const item = await ItemController.update(user, { id }, payload);
  ctx.body = item;
})

.post('/', async (ctx) => {
  const payload = ctx.request.body;
  const item = await ItemController.create(user, payload);
  ctx.body = item;
})

.del('/:id', async (ctx) => {
  const item = await ItemController.del(user, { id: ctx.params.id });
  ctx.body = item;
})

export { router };
