var Express = require('express')
var _ = require('underscore')
var app = Express()

var connections = []
var audience = []
var speaker = {}
var currentQuestion = false
var results = {
    a: 0,
    b: 0,
    c: 0,
    d: 0
}
var questions = require('./app-questions')
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
        // Find the disconnected member and remove them from the audience array
        var member = _.findWhere(audience, { id: this.id })
        if(member)
        {
            audience.splice(audience.indexOf(member), 1)
            io.sockets.emit('audience', audience)
            console.log("%s left the stream, there are now %s connections remaining", member.name, audience.length)
        }
        else if(this.id === speaker.id)
        {
            console.log("The speaker: %s has left the stream, the Presentation: %s is now over", speaker.name, title)
            speaker = {}
            title = "Waiting for Speaker"
            io.sockets.emit('end', { title: title, speaker: '' })
        }

        // Dispose of the socket
        connections.splice(connections.indexOf(socket), 1)
        socket.disconnect()
        console.log("Socket %s discconnected...%s connections remaining.", socket.id, connections.length)
    })

    // Join the room
    socket.on('join', function(payload) {
        var member = {
            id: this.id,
            name: payload.name,
            type: 'member'
        }
        audience.push(member)
        this.emit('joined', member)

        // Broadcast a message to all connected sockets
        io.sockets.emit('audience', audience)
        console.log("Audience member joined: %s", payload.name)
    })

    // Speaker functions
    socket.on('start', function(payload) {
        speaker.name = payload.name
        speaker.id = this.id
        speaker.type = 'speaker'
        title = payload.title

        this.emit('joined', speaker)
        io.sockets.emit('start', { title: title, speaker: speaker.name })
        console.log("%s started the Presentation: %s", speaker.name, title)
    })

    // Broadcast current question to all connected users
    socket.on('ask', function(question) {
        currentQuestion = question
        results = { a: 0, b: 0, c: 0, d: 0 }
        io.sockets.emit('ask', currentQuestion)
        console.log("Speaker: %s just asked a question: %s", question.q)
    })

    // Update the graph whenever an answer is sent
    socket.on('answer', function(payload) {
        results[payload.choice]++
        io.sockets.emit('results', results)
        console.log("Answer: %s - %j", payload.choice, results)
    })

    // Pass presentation details to any new connection
    socket.emit('welcome', {
        title: title,
        audience: audience,
        speaker: speaker.name,
        questions: questions,
        currentQuestion: currentQuestion,
        results: results
    })

    connections.push(socket)
    console.log("%s Connected, there are now %s clients connected", socket.id, connections.length)
})
