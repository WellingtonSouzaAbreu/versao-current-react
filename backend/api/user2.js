const bcrypt = require('bcrypt-nodejs')

module.exports = app => { // O app representa a instância do express em index.js
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id

        // /signup é usado para que não admins se cadastrem
        if (!req.originalUrl.startsWith('/users')) user.admin = false // /users é usada para cadastro de admins
        if (!req.user || !req.user.admin) user.admin = false     // Se usuário não estiver logado ou req vier admin false, não é admin

        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informado')
            existsOrError(user.confirmPassword, 'Confirmação de senha não informada')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const userfromDB = await app.db('users') //Acessa diretamente o db.js que contém o knex configurado e incorporado em app
                .where({ email: user.email }).first() // Retorna o primeiro

            if (!user.id) // Somete se of id não estiver sido setado, isso significa que se trata de uma alteração
                notExistsOrError(userfromDB, 'Usuário já cadastrado')
        } catch (err) {
            res.status(400).send(err) // Erro é do lado do cliente
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword // Confirm password não vai para o banco

        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => { //Buscar todos os usuários
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deletedAt')
            .then(users => /* { console.log(users); return */ res.json(users) /* } */)
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        //Em um soft delete deve-se desassociar todos os dados que possuem ligação com o usuário
        try {
            const articles = await app.db('articles')
                .where({ userId: req.params.id })
            notExistsOrError(articles, 'Usuário possui artigos.')

            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}