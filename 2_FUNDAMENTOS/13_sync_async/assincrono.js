const fs = require('fs')

console.log('Inicio')

fs.writeFile('arquivo.txt', 'Oi', function(err) {
    setTimeout(function(){
        console.log('Arquivo Criado')
    }, 1000);
})