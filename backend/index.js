const app = require('express')()
const consign = require('consign') // Consign auxilia com as dependências
const db = require('./config/db.js') // Importando db configurado pelo knex
const mongoose = require('mongoose')
require('./config/mongoDb') // Essa simples chamara já chama o arquivo de conexão e o inicia

app.db = db //Associa o db já configurado ao app // O db está disponível em todos os lugares onde há o app
app.mongoose = mongoose  //Acessar o mongoose de qualquer lugar com o app.mongoose
// COnsign realiza o gerenciamento de dependências
consign() // Consign envia o app como parâmetro para que o middlewares seja executado em um arquivo externo
    .include('./config/passport.js')
    .then('./config/middlewares.js') //Permite injetar as middlewares dentro da aplicação
    .then('./api/validation.js')
    .then('./api') //Api deve ser carregado primeiro, pois senão o método save não pode ser acessado por routes
    .then('./schedule')
    .then('./config/routes.js')
    .into(app) 

app.listen(3000, () => {
    console.log('Backend executando com sucesso...')
})