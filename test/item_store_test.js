import { knex } from '../src/server/book';
import * as api from '../src/server/store_item/api';
import * as itemApi from '../src/server/item/api';
import * as storeApi from '../src/server/store/api';
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

  it('create', async () => {
    const item    = await knex('items').where('title', 'Strawberry');
    const item_id = item[0].id;
    const price   = 3.49;
    const amount  = 4;
    const unit    = 'pint';

    const store   = await knex('stores').where('name', 'Uwajimaya');
    const store_id = store[0].id 

    const user = {
      name: 'Jonathan', isSuper: true 
    };

    const payload = {
      item_id, store_id, price, amount, unit
    };

    await api.create(user, payload);

    const query   = { item_id, store_id };
    var storeItem = await knex('items_stores').where(query);
    storeItem     = storeItem[0];

    storeItem.price.should.equal(price);
    storeItem.amount.should.equal(amount);
    storeItem.unit.should.equal(unit);

    var mappedStore = await knex('stores').where('id', storeItem.store_id);
    mappedStore     = mappedStore[0];

    mappedStore.name.should.equal('Uwajimaya');
  });

  it('create - one item with multiple stores', async () => {
    const item    = await knex('items').where('title', 'Chicken breast');
    const item_id = item[0].id;

    const store1    = await knex('stores').where('name', 'Trader Joes');
    const store1_id = store1[0].id;
    const store2    = await knex('stores').where('name', 'Uwajimaya');
    const store2_id = store2[0].id;
    const store3    = await knex('stores').where('name', 'Costco');
    const store3_id = store3[0].id;

    const user = { name: 'Jonathan', isSuper: true };

    const payload = { item_id, store_id: store1_id, price: 7.99, amount: 6, unit: 'breasts' };

    await api.createItem(user, payload, [ store1_id, store2_id, store3_id ]);

    // Check 
    const storeItems = await knex('items_stores').where('item_id', item_id);

    storeItems.length.should.equal(3);
  });

  it('read - one item with multiple stores', async () => {
    // TODO: seed
    const item    = await knex('items').where('title', 'Chicken breast');
    const item_id = item[0].id;

    const store1    = await knex('stores').where('name', 'Trader Joes');
    const store1_id = store1[0].id;
    const store2    = await knex('stores').where('name', 'Uwajimaya');
    const store2_id = store2[0].id;
    const store3    = await knex('stores').where('name', 'Costco');
    const store3_id = store3[0].id;

    const user = { name: 'Jonathan', isSuper: true };

    const payload1 = { item_id, store_id: store1_id, price: 7.99, amount: 6, unit: 'breasts' };
    const payload2 = { item_id, store_id: store2_id, price: 9.99, amount: 7, unit: 'breasts' };

    await api.create(user, payload1);
    await api.create(user, payload2);

    // Check 
    const items = await api.getItems(user, [ item_id ], [ store1_id, store2_id, store3_id ]);

    items[0].should.have.property('stores').with.length(2);
    items[0].stores[0].price.should.equal(7.99);
    items[0].stores[0].amount.should.equal(6);
    items[0].stores[1].price.should.equal(9.99);
    items[0].stores[1].amount.should.equal(7);
  });

  it('read - one item with all stores', async () => {
    // TODO: seed
    const item    = await knex('items').where('title', 'Chicken breast');
    const item_id = item[0].id;

    const store1    = await knex('stores').where('name', 'Trader Joes');
    const store1_id = store1[0].id;
    const store2    = await knex('stores').where('name', 'Uwajimaya');
    const store2_id = store2[0].id;

    const user = { name: 'Jonathan', isSuper: true };

    const payload1 = { item_id, store_id: store1_id, amount: 6, unit: 'none' };
    const payload2 = { item_id, store_id: store2_id, amount: 6, unit: 'none' };

    await api.create(user, payload1);
    await api.create(user, payload2);

    // Check 
    const items = await api.getItems(user, [ item_id ], null);

    items[0].should.have.property('stores').with.length(2);
  });

  it('read - all items with one store', async () => {
    // TODO: seed
    const item    = await knex('items').where('title', 'Chicken breast');
    const item_id = item[0].id;

    const store1    = await knex('stores').where('name', 'Trader Joes');
    const store1_id = store1[0].id;
    const store2    = await knex('stores').where('name', 'Uwajimaya');
    const store2_id = store2[0].id;

    const user = { name: 'Jonathan', isSuper: true };

    const payload1 = { item_id, store_id: store1_id, amount: 6, unit: 'none' };
    const payload2 = { item_id, store_id: store2_id, amount: 6, unit: 'none' };

    await api.create(user, payload1);
    await api.create(user, payload2);

    // Check 
    const items = await api.getItems(user, null, [ store1_id ]);

    items[0].should.have.property('stores').with.length(1);
  });

  it('update', async () => {
    // First create the item and put into join table
    // TODO: make this a seed
    const item    = await knex('items').where('title', 'Strawberry');
    const item_id = item[0].id;
    var price     = 3.49;
    var amount    = 4;
    var unit      = 'pint';

    const store    = await knex('stores').where('name', 'Uwajimaya');
    const store_id = store[0].id;

    const user = {
      name: 'Jonathan', isSuper: true 
    };

    var payload = {
      item_id, store_id, price, amount, unit
    };

    await api.create(user, payload);

    // Update
    price = 2;
    amount = 3;
    unit = 'pints' 

    payload = {
      item_id, store_id, price, amount, unit
    };

    await api.update(user, { item_id, store_id }, payload);

    const query = { item_id, store_id };
    var updatedItem = await knex('items_stores').where(query);
    updatedItem[0].price.should.equal(price);
    updatedItem[0].amount.should.equal(amount);
    updatedItem[0].unit.should.equal(unit);
  });

  it('delete', async () => {
    // First create the item and put into join table
    // TODO: make this a seed
    const item    = await knex('items').where('title', 'Strawberry');
    const item_id = item[0].id;
    const price   = 3.49;
    const amount  = 4;
    const unit    = 'pint';

    const store    = await knex('stores').where('name', 'Uwajimaya');
    const store_id = store[0].id;

    const user = {
      name: 'Jonathan', isSuper: true 
    };

    const payload = {
      item_id, store_id, price, amount, unit
    };

    await api.create(user, payload);

    // Delete
    await api.del(user, { item_id, store_id });

    const storeItem = await knex('items_stores').where('price', price);
    storeItem.length.should.equal(0);
  });

  it('items delete', async () => {
    // First create the item and put into join table
    // TODO: make this a seed
    const item    = await knex('items').where('title', 'Strawberry');
    const item_id = item[0].id;
    var price     = 3.49;
    var amount    = 4;
    var unit      = 'pint';

    const store    = await knex('stores').where('name', 'Uwajimaya');
    const store_id = store[0].id;

    const user = {
      name: 'Jonathan', isSuper: true 
    };

    const payload = {
      item_id, store_id, price, amount, unit
    };

    await api.create(user, payload);

    // Delete item and check to see if still in items_map table
    await itemApi.del(user, { id: item_id });

    const storeItem = await knex('items_stores').where('item_id', item_id);
    storeItem.length.should.equal(0);
  });

  it('store delete', async () => {
    // First create the item and put into join table
    // TODO: make this a seed
    const item    = await knex('items').where('title', 'Strawberry');
    const item_id = item[0].id;
    const price   = 3.49;
    const amount  = 4;
    const unit    = 'pint';

    const store    = await knex('stores').where('name', 'Uwajimaya');
    const store_id = store[0].id;

    const user = {
      name: 'Jonathan', isSuper: true 
    };

    const payload = {
      item_id, store_id, price, amount, unit
    };

    await api.create(user, payload);

    // Delete store and check
    await storeApi.del(user, { id: store_id });

    const storeItem = await knex('items_stores').where('store_id', store_id);
    storeItem.length.should.equal(0);
  });
});
