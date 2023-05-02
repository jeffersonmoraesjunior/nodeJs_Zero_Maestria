const express = require('express')
const app = express()
const port = 3000 //variavel ambiente

const path = require('path')

const users = require('./users') 

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

app.use('/users', users)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

// inicia o servidor e escuta na porta especificada;
app.listen(port,() => {
    console.log(`App rodando na porta ${port}`)
})