const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use('/api', routes)

const PORT = require('./config.json').port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))