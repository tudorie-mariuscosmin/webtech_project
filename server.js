const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use('/api', routes)

const PORT = 8080
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))