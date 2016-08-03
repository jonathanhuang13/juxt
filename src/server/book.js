const env = process.env.JUXT_ENV || 'development';

export const knex = require('knex')(require('../../knexfile')[env]);
export const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

export function extend(name, params) {
  const Klass = bookshelf.Model.extend(params);
  return bookshelf.model(name, Klass);
}