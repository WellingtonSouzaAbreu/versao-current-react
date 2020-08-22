module.exports = middleware => { // Não vai pelo consign
    return (req, res, next) => {
        if(req.user.admin){
            middleware(req, res, next)
        }else{
            res.status(401).send('Usuário não é administrador.')
        }
    }
}