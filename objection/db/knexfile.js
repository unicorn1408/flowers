// Update with your config settings.
const {knexSnakeCaseMappers} = require('objection');
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'flowers_db',
      user:     'postgres',
      password: '1408'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory:'./seeds'
    },
    ...knexSnakeCaseMappers,
  },
};
