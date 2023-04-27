const fs = require('fs') //file system

fs.readFile('arquivo.txt', 'utf-8', (err, data) => {
    if(err) {
        console.log(err)
        return
    }

    console.log(data)  

})

//Nesse modulo ele usou um core module chamado 'fs' file system, ele faz a leitura de arquivos no sistema operacional para que voce possa
//manipular os dados desse arquivo, o fs é uma forma mais segura, em seguida fizemos um if de erro, caso contrério retorna o dados do 
//arquivo. fs.readFile é o metodo de leitura

