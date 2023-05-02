const express = require('express')
const router = express.Router()
const path = require('path')

const basePath = path.join(__dirname, '../templates')

router.get('/', (req, res) => {
    res.sendFile(`${basePath}/projects.html`)
})

//router.get('/:id', (req, res) => {res.sendFile(`${basePath}/project.html`)})

router.get('/', (req, res) => {
    res.status(404).sendFile(`${basePath}/404.html`)
})

module.exports = router
