import uuid from 'node-uuid';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('items').insert({
          id: uuid.v4(), 
          title: 'Chicken breast',
          brand: 'Tyson\'s',
          price: 5.99,
          amount: 4,
          unit: 'breasts',
          tags: ['frozen', 'meat']
        }),
        knex('items').insert({
          id: uuid.v4(), 
          title: 'Strawberry',
          brand: 'Dole',
          price: 8.59,
          amount: 2,
          unit: 'pint',
          tags: ['organic', 'fruit']
        }),
      ]);
    });
};
