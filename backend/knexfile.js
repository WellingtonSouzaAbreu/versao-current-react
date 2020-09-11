// Update with your config settings.
const {db} = require('./.env')
module.exports = {
  client: 'postgresql',
  connection: db,
  pool: { // Numero de conexões
    min: 0,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations' // Tabela de migração
  }

};
