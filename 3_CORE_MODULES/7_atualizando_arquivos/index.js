const http = require('http')
const fs = require('fs')

const port = 3000

const server = http.createServer((req, res) => {

    const urlInfo = require('url').parse(req.url, true)
    const name = urlInfo.query.name;

    if(!name){
        //caso nao tenha nenhum nome
        fs.readFile('index.html', function(err, data){
            res.writeHead(200,{'Content-Type': 'text/html'})
            res.write(data)
            return res.end()
        })
    } else {
        nameNewLine = name + ',\r\n'//quebra linha de SO win e Lin

        //apos preenchimento do nome será add name da pessoa na linha debaixo
        fs.appendFile("arquivo.txt", nameNewLine, function(err, data){
            res.writeHead(302, {
                location: '/',
            })
            return res.end()
        })
    }

    })
server.listen(port,() => {
    console.log(`O servidor rodando na porta ${port}.`)
})
