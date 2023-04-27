const inquirer = require('inquirer')
const chalk = require('chalk')

//inicio das perguntas
inquirer.prompt([
    {name: 'name', message: 'Qual o seu nome? '},
    {name: 'idade', message: 'Qual a sua idade? '},
])
.then((answer) => {
    //caso o usuario nao insira as informações
    if(!answer.name || !answer.idade) {
        throw new Error('O nome e a idade são obrigatório!')
    }
    //texto com as variaveis
    const response = `O nome do usuário é ${answer.name} e sua idade é ${answer.idade} anos!`
    console.log(chalk.bgYellow.black(response)) //resposta configurada com as cores do chalk
})
.catch((err) => console.log(err)) //caso o código venha gerar algum tipo de erro