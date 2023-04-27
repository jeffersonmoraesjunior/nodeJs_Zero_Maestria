const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
    res.write('Ola Mundo Node.js HTTP')
    res.end()
})

server.listen(port,() => {
    console.log(`O servidor rodando na porta ${port}.`)
})
