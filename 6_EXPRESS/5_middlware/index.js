const express = require('express')
const app = express()
const port = 3000 //variavel ambiente

const path = require('path')

const basePath = path.join(__dirname,'templates')

const checkAuth = function(req, res, next) {

    //aqui é verificado se o usuário está logado ou não 'authStatus'
    req.authStatus = true

    if(req.checkAuth) {
        console.log('Está logado, pode continuar')
        next() //vá para próxima etapa
    } else {
        console.log('Não está logado, faça o login para continuar')
        next() //é necessário para seguir a próxima ação
    }

}

app.use(checkAuth)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port,() => {
    console.log(`App rodando na porta ${port}`)
})