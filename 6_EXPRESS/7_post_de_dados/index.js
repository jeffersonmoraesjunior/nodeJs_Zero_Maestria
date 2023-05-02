const express = require('express')
const app = express()
const port = 3000 //variavel ambiente

const path = require('path')

// ler o body
app.use(
    express.urlencoded({
        extended: true,
    }),
)

//configura o aplicativo para ler dados de formularios HTML objeto em java
app.use(express.json())

//definição do caminho
const basePath = path.join(__dirname,'templates') 


//definição das rotas no servidor e as funções de retorno de chamadas correspondentes;
app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

app.post('/users/save', (req, res) => {
    console.log(req.body)

    const name = req.body.name
    const age = req.body.age

    console.log(`O nome do usuário é ${name} e possui ${age} anos!`)

    res.sendFile(`${basePath}/userform.html`)
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id
 
    //leitura da tabela 'users' para resgatar o id do usuário:
    console.log(`Estamos buscando usuário: ${id}`)

    res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})
//fim das definições de rotas e correspondencias;

// inicia o servidor e escuta na porta especificada;
app.listen(port,() => {
    console.log(`App rodando na porta ${port}`)
})