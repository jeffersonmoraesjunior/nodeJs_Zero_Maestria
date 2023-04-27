const _ = require('lodash')
const chalk = require('chalk')

const a = [1,2,3,4,5,6,7,8,9]
const b = [2,4,6,8,10]

const diff = _.difference(a,b)

console.log(chalk.red.bold(diff))

