const mongoose = require('mongoose')
// Conneção com mongo db
mongoose.connect('mongodb://localhost/knowledge_stats', {useNewUrlParser: true})
    .catch(e => {
            const msg = 'Não foi possível connectar ao mongoDB!'
            console.log('\x1b[41m%s\x1b[36m', msg, '\x1b[0m')
    })