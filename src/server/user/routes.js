import { User } from '../book';

const router = require('koa-router')();

router
.get('/', async (ctx) => {
  const users = await User.query();
  ctx.body = users;
});

export { router };