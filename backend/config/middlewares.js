// Backend e frontend necessita do node para desenvolvimento, mas o frontend não precisa na fase de produção
// Permite acessar a API de outra aplicação(Frontend é uma aplicação e backend é outra)
const bodyParser = require('body-parser')
const cors = require('cors') 

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
}




