const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const http = require('http')
const socketio = require('socket.io')
const wsController = require('./controllers/webSockets')

const app = express()
const server = http.createServer(app)

const io = socketio(server)

app.use(bodyParser.json())



app.use('/api', routes)

io.on('connection', wsController);



const PORT = require('./config.json').port
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))