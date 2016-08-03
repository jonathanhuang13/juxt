module.exports = {
  test: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'juxt',
      password: 'juxt',
      database: 'juxt_test',
      charset: 'utf8'
    },
    migrations: { tableName: 'migrations' },
    seeds: { tableName: 'seeds' },
  },

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'juxt',
      password: 'juxt',
      database: 'juxt',
      charset: 'utf8'
    },
    migrations: { tableName: 'migrations' },
  },
};
