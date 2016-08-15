import { knex } from '../src/server/book';
import * as item_api from '../src/server/item/api';
import * as store_api from '../src/server/store/api';
import uuid from 'node-uuid';
import should from 'should';

describe('items_store api', async () => {
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

  it('item - update', async () => {
    const item = await knex('items').where('title', 'Chicken breast');
    const id   = item[0].id;

    const store1    = await knex('stores').where('name', 'Trader Joes');
    const store1_id = store1[0].id;
    const store2    = await knex('stores').where('name', 'Uwajimaya');
    const store2_id = store2[0].id;

    const user = { name: 'Jonathan', isSuper: true };

    item[0].unit.should.equal('breasts');
    item[0].tags[0].should.equal('frozen');

    const payload = {
      id, amount: 6, unit: 'none', store_ids: [ store1_id, store2_id ]
    };

    await item_api.update(user, { id }, payload);

    // Check items table
    var updatedItem = await knex('items').where('title', 'Chicken breast');
    updatedItem[0].unit.should.equal('none');
    updatedItem[0].amount.should.equal(6);

    // Check items_map table
    updatedItem = await knex('items_stores').where('item_id', id);
    updatedItem.length.should.equal(2);
  });

  it('items delete', async () => {
    // Create item and put into items_map table
    // TODO: seed items_map join table
    const item = await knex('items').where('title', 'Chicken breast');
    const id   = item[0].id;

    const store1    = await knex('stores').where('name', 'Trader Joes');
    const store1_id = store1[0].id;
    const store2    = await knex('stores').where('name', 'Uwajimaya');
    const store2_id = store2[0].id;

    const user = { name: 'Jonathan', isSuper: true };

    item[0].unit.should.equal('breasts');
    item[0].tags[0].should.equal('frozen');

    const payload = {
      id, amount: 6, unit: 'none', store_ids: [ store1_id, store2_id ]
    };

    await item_api.update(user, { id }, payload);

    var updatedItem = await knex('items').where('title', 'Chicken breast');
    updatedItem[0].unit.should.equal('none');
    updatedItem[0].amount.should.equal(6);

    updatedItem = await knex('items_stores').where('item_id', id);
    updatedItem.length.should.equal(2);

    // Delete item and check to see if still in items_map table
    await item_api.del(user, { id });

    updatedItem = await knex('items_stores').where('item_id', id);
    updatedItem.length.should.equal(0);
  });

  it('store update', async () => {
    // Create item and put into items_map table
    // TODO: seed items_map join table
    const item = await knex('items').where('title', 'Chicken breast');
    const id   = item[0].id;

    const store    = await knex('stores').where('name', 'Trader Joes');
    const store_id = store[0].id;

    const user = { name: 'Jonathan', isSuper: true };

    item[0].unit.should.equal('breasts');
    item[0].tags[0].should.equal('frozen');

    var payload = {
      id, amount: 6, unit: 'none', store_ids: [ store_id ]
    };

    await item_api.update(user, { id }, payload);

    var updatedItem = await knex('items').where('title', 'Chicken breast');
    updatedItem[0].unit.should.equal('none');
    updatedItem[0].amount.should.equal(6);

    updatedItem = await knex('items_stores').where('item_id', id);
    updatedItem.length.should.equal(1);

    // Update store and check
    var updatedStore = await knex('items_stores').where('store_id', store_id);
    updatedStore     = await knex('stores').where('id', updatedStore[0].store_id);
    updatedStore[0].acronym.should.equal('TJ');
    updatedStore[0].state.should.equal('WA');

    payload = {
      id: store_id, acronym: 'TJS', state: 'Washington'
    };

    await store_api.update(user, { id: store_id }, payload);

    var updatedStore = await knex('items_stores').where('store_id', store_id);
    updatedStore     = await knex('stores').where('id', updatedStore[0].store_id);
    updatedStore[0].acronym.should.equal('TJS');
    updatedStore[0].state.should.equal('Washington');
  });

  it('store delete', async () => {
    // Create item and put into items_map table
    // TODO: seed items_map join table
    const item = await knex('items').where('title', 'Chicken breast');
    const id   = item[0].id;

    const store    = await knex('stores').where('name', 'Trader Joes');
    const store_id = store[0].id;

    const user = { name: 'Jonathan', isSuper: true };

    item[0].unit.should.equal('breasts');
    item[0].tags[0].should.equal('frozen');

    var payload = {
      id, amount: 6, unit: 'none', store_ids: [ store_id ]
    };

    await item_api.update(user, { id }, payload);

    var updatedItem = await knex('items').where('title', 'Chicken breast');
    updatedItem[0].unit.should.equal('none');
    updatedItem[0].amount.should.equal(6);

    updatedItem = await knex('items_stores').where('item_id', id);
    updatedItem.length.should.equal(1);

    // Update store and check
    var updatedStore = await knex('items_stores').where('store_id', store_id);
    updatedStore     = await knex('stores').where('id', updatedStore[0].store_id);
    updatedStore.length.should.equal(1);

    await store_api.del(user, { id: store_id });

    var updatedStore = await knex('items_stores').where('store_id', store_id);
    updatedStore.length.should.equal(0);

  });
});
