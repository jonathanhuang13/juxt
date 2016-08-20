const book = require('./book');

import Koa from 'koa';
import { router as ItemRouter } from './item/routes';
import { router as StoreRouter } from './store/routes';
import { router as UserRouter } from './user/routes';
import { router as JuxtRouter } from './juxt/routes';

const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

router.get('/', async (ctx) => {
  ctx.body = 'Welcome to the server!!';
})

router.use('/users', UserRouter.routes());
router.use('/stores', StoreRouter.routes());
router.use('/items', ItemRouter.routes());
router.use('/juxt', JuxtRouter.routes());

app
  .use(require('koa-logger')())
  .use(require('kcors')())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
