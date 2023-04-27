const path = require('path')

//path absoluto
console.log(path.resolve("junior.txt"))

//formar um path
const midFolder = 'relatorios'
const fileName = 'junior.txt'

const finalPath = path.join('/', 'arquivos', midFolder, fileName)

console.log(finalPath)