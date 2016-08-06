import uuid from 'node-uuid';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('stores').insert({
          id: uuid.v1(), 
          name: 'Trader Joes',
          acronym: 'TJ',
          city: 'Seattle',
          state: 'WA',
          zip: '98105',
          address1: '4555 Roosevelt Way NE'
        }),
        knex('stores').insert({
          id: uuid.v1(), 
          name: 'Uwajimaya',
          acronym: 'UJ',
          city: 'Seattle',
          state: 'WA',
          zip: '98104',
          address1: '600 5th Ave S'
        }),
        knex('stores').insert({
          id: uuid.v1(), 
          name: 'Costco',
          acronym: 'CT',
          city: 'Kirkland',
          state: 'WA',
          zip: '98033',
          address1: '8629 120th Avenue NE'
        }),
      ]);
    });
};
