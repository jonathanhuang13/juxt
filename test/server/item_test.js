import { knex } from '../../src/server/book';
import * as api from '../../src/server/item/api';
import uuid from 'node-uuid';
import should from 'should';

describe('items api', async () => {
  beforeEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        knex.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  afterEach( (done) => {
    knex.migrate.rollback()
    .then(() => {
      done();
    });
  });

  it('normal - create', async () => {
    const id     = uuid.v1();
    const title  = 'Almond milk'
    const brand  = 'Horizon\'s';
    const tags   = ['non-dairy', 'organic'];

    const user = {
      name: 'Jonathan', isSuper: false 
    };

    const payload = {
      id, title, brand, tags
    };

    await api.create(user, payload);

    var createdItem = await knex('items').where('id', id);
    createdItem = createdItem[0];

    should.not.exist(createdItem);    
  });

  it('normal - read', async () => {
    const item = await knex('items').where('title', 'Strawberry');
    const id   = item[0].id;
    const user = { name: 'Jonathan', isSuper: false };

    const model = await api.read(user, { id });

    model.get('title').should.equal('Strawberry');
  });

  it('normal - update', async () => {
    const item = await knex('items').where('title', 'Chicken breast');
    const id   = item[0].id;
    const user = { name: 'Jonathan', isSuper: false };

    item[0].tags[0].should.equal('frozen');

    const payload = {
      id, brand: 'Or'
    };

    await api.update(user, { id }, payload);

    const updatedItem = await knex('items').where('title', 'Chicken breast');
    updatedItem[0].brand.should.equal('Tyson\'s');
  });

  it('normal - del', async () => {
    var item   = await knex('items').where('title', 'Strawberry');
    const id   = item[0].id;
    const user = { name: 'Jonathan', isSuper: false };

    item.length.should.be.above(0);

    await api.del(user, { id });

    item = await knex('items').where('title', 'Strawberry');
    item.length.should.equal(1);
  });

  it('super - create', async () => {
    const id     = uuid.v1();
    const title  = 'Almond milk'
    const brand  = 'Horizon\'s';
    const tags   = ['non-dairy', 'organic'];

    const user = {
      name: 'Jonathan', isSuper: true 
    };

    const payload = {
      id, title, brand, tags
    };

    await api.create(user, payload);

    // Check items table
    var createdItem = await knex('items').where('id', id);
    createdItem     = createdItem[0];

    createdItem.title.should.equal(title);
    createdItem.brand.should.equal(brand);

    for (var i = 0; i < tags.length; i++) {
      createdItem.tags[i].should.equal(tags[i]);
    }
  });

  it('super - read', async () => {
    const item = await knex('items').where('title', 'Strawberry');
    const id   = item[0].id;
    const user = { name: 'Jonathan', isSuper: true };

    const model = await api.read(user, { id });

    model.get('title').should.equal('Strawberry');
  });

  it('super - update', async () => {
    const item = await knex('items').where('title', 'Chicken breast');
    const id   = item[0].id;
    const user = { name: 'Jonathan', isSuper: true };

    item[0].brand.should.equal('Tyson\'s');

    const payload = {
      id, brand: 'Home cooked'
    };

    await api.update(user, { id }, payload);

    // Check items table
    var updatedItem = await knex('items').where('title', 'Chicken breast');
    updatedItem[0].brand.should.equal('Home cooked');

    // Check items_map table
    updatedItem = await knex('items_stores').where('item_id', id);
    updatedItem.length.should.equal(0);
  });

  it('super - del', async () => {
    var item   = await knex('items').where('title', 'Strawberry');
    const id   = item[0].id;
    const user = { name: 'Jonathan', isSuper: true };

    item.length.should.be.above(0);

    await api.del(user, { id });

    item = await knex('items').where('title', 'Strawberry');
    item.length.should.equal(0);
  });

});
