const nodeSchedule = require('node-schedule')

module.exports = app => {
    nodeSchedule.scheduleJob('* */1 * * * *', async function () {
        // Adiciona um atributo count aos contadores
        const usersCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()

        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {}, { sort: { 'createdAt': -1 } })

        const stat = new Stat({ // New stat vem do modelo do arquivo stat.js
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            createdAt: new Date()
        })

        //Verifica se houve mudança antes de atualizar o dados
        //Se lastStat não está configurado ou se O stat Atual é diferente de lastStat
        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles
        

        // let msg = '[Stats] Estatísticas atualizadas!'
        if (changeUsers || changeCategories || changeArticles) { //console.log('\x1b[41m%s\x1b[36m', msg, '\x1b[0m')
            stat.save().then(() => console.log('[Stats] Estatísticas atualizadas!'))
            // Save salva no mongodb
        }


    })
}