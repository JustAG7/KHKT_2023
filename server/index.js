const express = require('express')
const app = express()
const port = 1337

app.use(express.static('public'))

