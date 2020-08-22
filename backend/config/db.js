const config = require('../knexfile.js') //Arquivo de configuração do knex
const knex = require('knex')(config)

// Não é uma boa prática no caso de sistemas distribuidos
knex.migrate.latest([config]) //Execura a migrate de criação de tabelas assim que for carregado o backend

module.exports = knex