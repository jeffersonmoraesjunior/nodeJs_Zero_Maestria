const express = require('express')
const app = express()
const port = 5000
const path = require('path')

const projectsRouters = require('./projects')

app.use(express.static('public'))

app.use('/projects', projectsRouters)

//saida do sistema
app.listen(port, () => {
    console.log(`O servidor está na porta ${port}`)
})
