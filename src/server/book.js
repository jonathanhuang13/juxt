const env = process.env.JUXT_ENV || 'development';

export const knex = require('knex')(require('../../knexfile')[env]);
export const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

export const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
});

export const Store = bookshelf.Model.extend({
  tableName: 'stores',
  hasTimestamps: true,
  items: function() {
    return this.belongsToMany(Item);
  }
});

export const Item  = bookshelf.Model.extend({
  tableName: 'items',
  hasTimestamps: true,
  stores: function() {
    return this.belongsToMany(Store);
  }
});
