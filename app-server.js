var Express = require('express')

var app = Express()

var connections = []
var title = 'Untitled Presentation'

app.use(Express.static('./public'))
app.use(Express.static('./node_modules/bootstrap/dist'))

var server = app.listen(3000)
console.log('polling server running on localhost:3000')

// Create a socket server to listen to inbound connections
var io = require('socket.io').listen(server)
io.sockets.on('connection', function(socket) {

    // Pop one socket from the array and force the disconnect
    socket.once('disconnect', function() {
        connections.splice(connections.indexOf(socket), 1)
        socket.disconnect()
        console.log("Socket %s discconnected...%s connections remaining.", socket.id, connections.length)
    })

    socket.emit('welcome', {
        title: title
    })

    connections.push(socket)
    console.log("%s Connected, there are now %s clients connected", socket.id, connections.length)
})
