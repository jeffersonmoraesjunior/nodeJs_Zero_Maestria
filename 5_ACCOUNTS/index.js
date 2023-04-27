// modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

//modulos internos
const fs = require('fs')
 
operation()

//são as perguntas feitas no sistema..
function operation(){
    console.log('Bem-Vindo ao Moraes Bank!')
    inquirer
        .prompt([
        {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: ['Criar Conta', 'Consultar Saldo','Depositar', 'Sacar', 'Sair'],
        },
    ])
    .then((answer) => {
        const action = answer['action']
        console.log(`'${action}' selecionado`)
        
        //condição de crição da conta
        if(action === 'Criar Conta') {

            createAccount()

        } else if(action === 'Consultar Saldo'){
            
            getAccountBalance()

        } else if(action === 'Depositar') {
            
            deposit()

        } else if(action === 'Sacar') {

            withdraw()  

        } else if(action === 'Sair') {
            console.log(chalk.bgYellow.black('Obrigado por usar o Moraes Bank!'))
            process.exit()
        }
    })
    .catch((err) => console.log(err)) //apenas se caso vier a ter algum erro
}

//create an account
function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o Banco Moraes'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))

    buildAccount()
     
}

//o usuário irá inserir os dados para criar a conta
function buildAccount() {
    inquirer
        .prompt([
        {
            name: 'accountName',
            message: 'Digite um nome ou número para a sua conta:'
        }
    ])
    .then(answer => {
        const accountName = answer['accountName']
        console.info(accountName)
        
        //se não existir a conta fará a criação
        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts') //accounts é o diretorio raiz das contas
        }

        //se a conta já existir, o sistema dará um alerta com a mensagem.
        //`accounts/${accountName}.json é o caminho das contas cadastradas.
        if(fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('Esta conta já existe, tente novamente.'),
            )
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function(err){
            console.log(err)
        })
        console.log(chalk.green(`Parabéns, sua conta ${accountName} foi criada.`))
        
        operation()
        
        
    })
    .catch((err) => console.log(err))
    
}

// add an amount to user account
function deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome/Número da sua conta?'
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        //verify if account exist
        if(!checkAccount(accountName)){
            return deposit()
        }

        inquirer
            .prompt([
            {
            name:'amount',
            message:'Qual o valor para Deposito?'
            },
        ])
        .then((answer) => {
            const amount = answer['amount']

            // add an amount
            addAmount(accountName, amount)
            operation()
        })
        .catch(err => console.log(err))

    })
    .catch(err => console.log(err))
}
 //será feito uma analise da conta
function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe, tente novamente!'))
        return false
    }
    return true
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if(!amount || amount===0) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return deposit()
    }
    
    // QUANTIA SENDO ADICIONADA NA CONTA
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    //JSON.stringify é a transformação do float em string novamente
    fs.writeFileSync(`accounts/${accountName}.json`,JSON.stringify(accountData),
        function (err) {
            console.log(err)
        },
    )
    console.log(chalk.bgGreen.white(`Foi Depositado o valor de R$${amount} na sua conta ${accountName}!`))
    console.log(chalk.bgGreen.black(`Seu saldo é de R$${accountData.balance}`))

}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding:'utf-8',
        flag: 'r'
    })
    return JSON.parse(accountJSON)

}

// show account balance
function getAccountBalance(){
    inquirer
        .prompt([
        {
            name: 'accountName',
            message: 'Qual o nome/Número da sua conta?'
        }
    ])
    .then((answer) => {

        const accountName = answer['accountName']

        //verify if account exist
        if(!checkAccount(accountName)) {
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)

        console.log(chalk.bgGreen.black(`Seu saldo é de R$${accountData.balance}`))
        
        operation()

    })
    .catch(err => console.log(err))
}

//withdraw an amount from user account
function withdraw(){
    inquirer
        .prompt([
        {
            name:'accountName',
            message:'Qual é o Nome/Número da sua conta?'
        }
    ])
    .then((answer) => {

        const accountName = answer['accountName']

        if(!checkAccount(accountName)) {
            return withdraw()
        }

        inquirer
            .prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja sacar?'
            }
        ]).then((answer) => {
            const amount = answer['amount']

            removeAmount(accountName, amount)
        })
        .catch(err => console.log(err))

    })
    .catch(err => console.log(err))
}

//fará a validação do saque
function removeAmount(accountName, amount) {
    
    const accountData = getAccount(accountName)

    if(!amount) {
        console.log(chalk.bgRed.black('Valor inválido, tente novamente mais tarde!'))
        return withdraw()
    } 

    if(accountData.balance < amount) {
        console.log(chalk.bgRed.black('Valor indisponível para saque.'))
        return withdraw()
    }

    //subtraindo o valor de saque e transformando em número
    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    //tranformando o arquivo em string novamente
    fs.writeFileSync(`accounts/${accountData}.json`, JSON.stringify(accountData),
    function (err) {
        console.log(err)
    })
    console.log(chalk.bgGreen.black(`Foi realizado um saque de R$${amount} da sua conta ${accountName}`))
    console.log(chalk.bgGreen.black(`Seu saldo é de R$${accountData.balance}`))
    operation()
}