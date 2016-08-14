import { knex } from '../src/server/book';
import * as api from '../src/server/item/api';
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
    const price  = 3.49;
    const amount = 4;
    const unit   = 'pint';
    const tags   = ['non-dairy', 'organic'];

    const user = {
      name: 'Jonathan', isSuper: false 
    };

    const payload = {
      id, title, brand, price, amount, unit, tags 
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
    model.get('price').should.equal(8.59);
  });

  it('normal - update', async () => {
    const item = await knex('items').where('title', 'Chicken breast');
    const id   = item[0].id;
    const user = { name: 'Jonathan', isSuper: false };

    item[0].unit.should.equal('breasts');
    item[0].tags[0].should.equal('frozen');

    const payload = {
      id, amount: 6, unit: 'none'
    };

    await api.update(user, { id }, payload);

    const updatedItem = await knex('items').where('title', 'Chicken breast');
    updatedItem[0].unit.should.equal('breasts');
    updatedItem[0].amount.should.equal(4);
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
    const price  = 3.49;
    const amount = 4;
    const unit   = 'pint';
    const tags   = ['non-dairy', 'organic'];

    const store     = await knex('stores').where('name', 'Uwajimaya');
    const store_ids = [ store[0].id ];

    const user = {
      name: 'Jonathan', isSuper: true 
    };

    const payload = {
      id, title, brand, price, amount, unit, tags, store_ids
    };

    await api.create(user, payload);

    // Check items table
    var createdItem = await knex('items').where('id', id);
    createdItem     = createdItem[0];

    createdItem.title.should.equal(title);
    createdItem.brand.should.equal(brand);
    createdItem.price.should.equal(price);
    createdItem.amount.should.equal(amount);
    createdItem.unit.should.equal(unit);

    for (var i = 0; i < tags.length; i++) {
      createdItem.tags[i].should.equal(tags[i]);
    }

    // Check items_stores table
    createdItem = await knex('items_stores').where('item_id', id);
    createdItem = createdItem[0];

    var mapped_store = await knex('stores').where('id', createdItem.store_id);
    mapped_store     = mapped_store[0];

    mapped_store.name.should.equal('Uwajimaya');
  });

  it('super - read', async () => {
    const item = await knex('items').where('title', 'Strawberry');
    const id   = item[0].id;
    const user = { name: 'Jonathan', isSuper: true };

    const model = await api.read(user, { id });

    model.get('title').should.equal('Strawberry');
    model.get('price').should.equal(8.59);
  });

  it('super - update item only', async () => {
    const item = await knex('items').where('title', 'Chicken breast');
    const id   = item[0].id;
    const user = { name: 'Jonathan', isSuper: true };

    item[0].unit.should.equal('breasts');
    item[0].tags[0].should.equal('frozen');

    const payload = {
      id, amount: 6, unit: 'none'
    };

    await api.update(user, { id }, payload);

    // Check items table
    var updatedItem = await knex('items').where('title', 'Chicken breast');
    updatedItem[0].unit.should.equal('none');
    updatedItem[0].amount.should.equal(6);

    // Check items_map table
    updatedItem = await knex('items_stores').where('item_id', id);
    updatedItem = updatedItem[0];
    should.not.exist(updatedItem);
  });

  it('super - update item and store', async () => {
    const item = await knex('items').where('title', 'Chicken breast');
    const id   = item[0].id;

    const store = await knex('stores').where('name', 'Trader Joes');
    const store_id = store[0].id;
    const user = { name: 'Jonathan', isSuper: true };

    item[0].unit.should.equal('breasts');
    item[0].tags[0].should.equal('frozen');

    const payload = {
      id, amount: 6, unit: 'none', store_ids: [ store_id ]
    };

    await api.update(user, { id }, payload);

    // Check items table
    var updatedItem = await knex('items').where('title', 'Chicken breast');
    updatedItem[0].unit.should.equal('none');
    updatedItem[0].amount.should.equal(6);

    // Check items_map table
    updatedItem = await knex('items_stores').where('item_id', id);
    updatedItem = updatedItem[0];

    var mappedStore = await knex('stores').where('id', updatedItem.store_id);
    mappedStore[0].name.should.equal('Trader Joes');
  });

  it('super - del', async () => {
    var item  = await knex('items').where('title', 'Strawberry');
    const id   = item[0].id;
    const user = { name: 'Jonathan', isSuper: true };

    item.length.should.be.above(0);

    await api.del(user, { id });

    item = await knex('items').where('title', 'Strawberry');
    item.length.should.equal(0);
  });

});
