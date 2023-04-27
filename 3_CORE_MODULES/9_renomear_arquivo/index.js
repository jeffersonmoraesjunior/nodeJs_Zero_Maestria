const fs = require('fs')

const arqNovo = 'arquivoNovo.txt'
const arqAntigo = 'arquivo.txt'

fs.rename(arqAntigo, arqNovo, function(err){
    if (err){
        console.log(err)
        return
    }
    console.log(`O arquivo ${arqAntigo} foi renomeado para ${arqNovo}`)
})