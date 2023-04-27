const fs = require('fs')
const path = require('path')

const minhaPasta = "minhaPasta"
//se a pasta não existir, então:

if(!fs.existsSync(minhaPasta)) {
    console.log('Não existe')
    // em seguido, não havendo, será criado a pasta
    fs.mkdirSync(minhaPasta)
} else if(fs.existsSync(minhaPasta)){ //será impresso o nome da pasta criada e onde está localizada
    console.log(`Ok. Existe o diretorio ${minhaPasta}.\r\nE está localizado em '${path.resolve(minhaPasta)}'`)
    // o recurso \n\r funciona como quebra de linha no node.js
}