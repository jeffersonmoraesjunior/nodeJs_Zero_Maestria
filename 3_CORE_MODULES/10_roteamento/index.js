const http = require('http')
const fs = require('fs')
const url = require('url')

const port = 3000

const server = http.createServer((req, res) => {

    const q = url.parse(req.url, true)
    const filename = q.pathname.substring(1) //segundo caractere para frente ( /home )

    if(filename.includes('html')) {
        if(fs.existsSync(filename)){

             //caso nao tenha nenhum nome
        fs.readFile(filename, function(err, data){
            res.writeHead(200,{'Content-Type': 'text/html'})
            res.write(data)
            return res.end()
        })

        } else {
            //404 exemplo de erro (localHost:3000/xxx.html) o xxx não existe
            fs.readFile('404.html', function(err, data){
                res.writeHead(404,{'Content-Type': 'text/html'})
                res.write(data)
                return res.end()
            })

        }
    }
})

server.listen(port,() => {
    console.log(`O servidor rodando na porta ${port}.`)
})
