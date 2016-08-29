import { knex } from '../../src/server/book';
import * as api from '../../src/server/store/api';
import uuid from 'node-uuid';
import should from 'should';

describe('stores api', async () => {
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
    const id       = uuid.v1();
    const name     = 'Safeway';
    const acronym  = 'SW';
    const city     = 'Seattle';
    const state    = 'WA';
    const zip      = '98105'
    const address1 = '3020 NE 45th St';

    const user = {
      name: 'Jonathan', isSuper: false 
    };

    const payload = {
      id, name, acronym, city, state, zip, address1
    };

    await api.create(user, payload);

    var createdStore = await knex('stores').where('id', id);
    createdStore = createdStore[0];

    should.not.exist(createdStore);    
  });

  it('normal - read', async () => {
    const store = await knex('stores').where('name', 'Uwajimaya');
    const id    = store[0].id;
    const user  = { name: 'Jonathan', isSuper: false };

    const model = await api.read(user, { id });

    model.get('name').should.equal('Uwajimaya');
    model.get('acronym').should.equal('UJ');
  });

  it('normal - search', async () => {
    const item = await knex('stores').where('name', 'Trader Joes');

    const model = await api.search(null, 'Trader');

    model.get('name').should.equal('Trader Joes');
  });

  it('normal - update', async () => {
    const store = await knex('stores').where('name', 'Trader Joes');
    const id     = store[0].id;
    const user   = { name: 'Jonathan', isSuper: false };

    store[0].acronym.should.equal('TJ');
    store[0].state.should.equal('WA');

    const payload = {
      id, acronym: 'TJS', state: 'Washington'
    };

    await api.update(user, { id }, payload);

    const updatedStore = await knex('stores').where('name', 'Trader Joes');
    updatedStore[0].acronym.should.equal('TJ');
    updatedStore[0].state.should.equal('WA');
  });

  it('normal - del', async () => {
    var store  = await knex('stores').where('name', 'Costco');
    const id   = store[0].id;
    const user = { name: 'Jonathan', isSuper: false };

    store.length.should.be.above(0);

    await api.del(user, { id });

    store = await knex('stores').where('name', 'Costco');
    store.length.should.equal(1);
  });

  it('super - create', async () => {
    const id       = uuid.v1();
    const name     = 'Safeway';
    const acronym  = 'SW';
    const city     = 'Seattle';
    const state    = 'WA';
    const zip      = '98105'
    const address1 = '3020 NE 45th St';

    const user = {
      name: 'Jonathan', isSuper: true 
    };

    const payload = {
      id, name, acronym, city, state, zip, address1
    };

    await api.create(user, payload);

    var createdStore = await knex('stores').where('id', id);
    createdStore = createdStore[0];

    createdStore.name.should.equal(name);
    createdStore.acronym.should.equal(acronym);
    createdStore.city.should.equal(city);
    createdStore.state.should.equal(state);
    createdStore.zip.should.equal(zip);
    createdStore.address1.should.equal(address1);

  });

  it('super - read', async () => {
    const store = await knex('stores').where('name', 'Uwajimaya');
    const id    = store[0].id;
    const user  = { name: 'Jonathan', isSuper: true };

    const model = await api.read(user, { id });

    model.get('name').should.equal('Uwajimaya');
    model.get('acronym').should.equal('UJ');
  });

  it('super - update', async () => {
    const store = await knex('stores').where('name', 'Trader Joes');
    const id    = store[0].id;
    const user  = { name: 'Jonathan', isSuper: true };

    store[0].acronym.should.equal('TJ');
    store[0].state.should.equal('WA');

    const payload = {
      id, acronym: 'TJS', state: 'Washington'
    };

    await api.update(user, { id }, payload);

    const updatedStore = await knex('stores').where('name', 'Trader Joes');
    updatedStore[0].acronym.should.equal('TJS');
    updatedStore[0].state.should.equal('Washington');
  });

  it('super - del', async () => {
    var store  = await knex('stores').where('name', 'Costco');
    const id   = store[0].id;
    const user = { name: 'Jonathan', isSuper: true };

    store.length.should.be.above(0);

    await api.del(user, { id });

    store = await knex('stores').where('name', 'Costco');
    store.length.should.equal(0);
  });

});
