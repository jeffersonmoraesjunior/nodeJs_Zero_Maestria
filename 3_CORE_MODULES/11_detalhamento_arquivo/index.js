const fs = require('fs')

//faz a verificação do arquivo e no seu formato
//err para caso ele venha gerar um erro e logo apos seu tipo de status
fs.stat('arquivo.txt', (err, stats) => {
    if(err) {
        console.log(err)
        return
    }

   console.log(stats.isFile())
   console.log(stats.isDirectory())
   console.log(stats.isSymbolicLink()) //se é um link simbolico no arquivo(atalho)
   console.log(stats.ctime)
   console.log(stats.size)


})