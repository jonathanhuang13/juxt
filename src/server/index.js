const book = require('./book');

import Koa from 'koa';
import Store from './store';
import Item from './item';
import User from './user';

const app = new Koa();

const router = require('koa-router')();

router
.get('/store', async (ctx) => {
  const store = await Store.query();
  ctx.body = store;
})

.get('/store/:id', async (ctx) => {
  const store = await Store.query().where({ id: ctx.params.id });
  ctx.body = store;
})

.get('/item', async (ctx) => {
  const item = await Item.query();
  ctx.body = item;
})

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