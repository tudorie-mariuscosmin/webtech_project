const express = require('express')
const routes = require('./routes')
const app = express()

app.use('/api', routes)

const PORT = 8080
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))