//esse é um router para que o arquivo principal

const express = require('express')
const router = express.Router()
const path = require('path')


//definição do caminho
const basePath = path.join(__dirname,'../templates') 


//definição das rotas no servidor e as funções de retorno de chamadas correspondentes;
router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

router.post('/save', (req, res) => {
    console.log(req.body)

    const name = req.body.name
    const age = req.body.age

    console.log(`O nome do usuário é ${name} e possui ${age} anos!`)

    res.sendFile(`${basePath}/userform.html`)
})

router.get('/:id', (req, res) => {
    const id = req.params.id
 
    //leitura da tabela 'users' para resgatar o id do usuário:
    console.log(`Estamos buscando usuário: ${id}`)

    res.sendFile(`${basePath}/users.html`)
})

router.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

module.exports = router

