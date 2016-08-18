const book = require('./book');

import Koa from 'koa';
import { Store, Item, User } from './book';
import * as ItemController from './item/api';
import * as StoreController from './store/api';

const app = new Koa();
const router = require('koa-router')();

const user = { name: 'Jonathan', isSuper: 'true' };

router.get('/', async (ctx) => {
  ctx.body = 'hi';
})

router
.get('/store', async (ctx) => {
  const store = await Store.query();
  ctx.body = store;
})
.get('/store/:id', async (ctx) => {
  // const store = await Store.query().where({ id: ctx.params.id });
  const store = await StoreController.read(user, { id: ctx.params.id });
  ctx.body = store;
})
.post('/store', async (ctx) => {

})
.del('store/:id', async (ctx) => {
  const store = await StoreController.del(user, { id: ctx.params.id });
  ctx.body = store;
})

router
.get('/item', async (ctx) => {
  const item = await Item.query();
  ctx.body = item;
})
.get('/item/:id', async (ctx) => {
  const item = await ItemController.read(user, { id: ctx.params.id });
})
.post('/item', async (ctx) => {

})
.del('item/:id', async (ctx) => {
  const item = await ItemController.del(user, { id: ctx.params.id });
  ctx.body = item;
})

router
.get('/users', async (ctx) => {
  const users = await User.query();
  ctx.body = users;
});

app
  .use(require('koa-logger')())
  .use(require('kcors')())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
