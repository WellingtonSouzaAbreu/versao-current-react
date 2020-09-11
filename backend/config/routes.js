const admin = require('./admin.js')

module.exports = app => {

    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    // Urls protegias com validação de token v

    app.route('/users') // Acionada qunado vier um método post/get nessa url
        // .all(app.config.passport.authenticate())
        .post(/* admin( */app.api.user.save/* ) */    /* Substitui o require(consign) */) // Save já está dentro de app, por causa do consign do arquivo user.js
        .get(/* admin( */app.api.user.get/* ) */)

    app.route('/users/:id') //SAbe-se se está alterando ou inserindo por causa da presença do id
        // .all(app.config.passport.authenticate())
        .put(/* admin( */app.api.user.save/* ) */)
        .get(/* admin( */app.api.user.getById/* ) */)
        .delete(/* admin( */app.api.user.remove/* ) */)

    app.route('/categories')
        // .all(app.config.passport.authenticate())
        .get(/* admin( */app.api.category.get/* ) */)
        .post(/* admin( */app.api.category.save/* ) */)

    // Cuidado com a ordem. Requisições mais específicas devem estar no início
    app.route('/categories/tree')
     // .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)

    app.route('/categories/:id')
     // .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(/* admin( */app.api.category.save/* ) */)
        .delete(/* admin( */app.api.category.remove/* ) */) // A função remove é o middleware.
    // Admin funciona como um filtro, o remove só é executado se o user for admin
    app.route('/articles')
     // .all(app.config.passport.authenticate())
        .get(/* admin( */app.api.article.get/* ) */)
        .post(/* admin( */app.api.article.save/* ) */)

    app.route('/articles/:id')
     // .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(/* admin( */app.api.article.save/* ) */)
        .delete(/* admin( */app.api.article.remove/* ) */)
        .delete(/* admin( */app.api.user.remove/* ) */)

    app.route('/categories/:id/articles')
     // .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory)

    app.route('/stats')
        // .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}