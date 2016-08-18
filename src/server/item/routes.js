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
.post('/', async (ctx) => {

})
.del('/:id', async (ctx) => {
  const item = await ItemController.del(user, { id: ctx.params.id });
  ctx.body = item;
})

export { router };