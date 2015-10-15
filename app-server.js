var express = require('express')
var app = express()

app.use(express.static('./public'))
app.use(express.static('./node_modules/bootstrap/dist'))

var server = app.listen(3000)
console.log('polling server running on localhost:3000')

// Create a socket server to listen to inbound connections
var io = require('socket.io').listen(server)
io.sockets.on('connection', function(socket) {
    console.log("Connected: %s", socket.id)
})
