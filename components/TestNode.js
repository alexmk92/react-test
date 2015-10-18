import React from 'react'
import io from 'socket.io-client'
import {Map} from 'immutable'

var Header = require('./parts/Header')

var TestNode = React.createClass({
    getInitialState() {
        return {
            status: 'disconnected',
            title: '',
            member: {},
            audience: [],
            speaker: '',
            questions: [],
            results: {},
            currentQuestion: false
        }
    },
    // Inbound socket traffic bindings
    componentWillMount() {
        this.socket = io('http://localhost:3000')
        this.socket.on('connect', this.connect)
        this.socket.on('disconnect', this.disconnect)
        this.socket.on('welcome', this.updateState)
        this.socket.on('joined', this.join)
        this.socket.on('audience', this.updateAudience)
        this.socket.on('start', this.start)
        this.socket.on('end', this.updateState),
        this.socket.on('ask', this.ask),
        this.socket.on('results', this.updateResults)
    },
    // Used by child props to pass data back to the socket (outgoing traffic)
    emit(eventName, payload) {
        this.socket.emit(eventName, payload)
    },
    disconnect() {
        this.setState({
            status: 'disconnected',
            title: 'Connection to the server was lost...',
            speaker: ''
        })
    },
    connect() {
        var member = sessionStorage.member ? JSON.parse(sessionStorage.member) : null
        if(member && member.type === 'audience')
            this.emit('join', member)
        else if(member && member.type === 'speaker')
            this.emit('start', { name: member.name, title: sessionStorage.title })

        this.setState({
            status: 'connected'
        })
    },
    updateState(serverState) {
        this.setState(serverState)
    },
    // Fires when a new member joins, we save the user to session storage so we can stay joined in room
    join(member) {
        sessionStorage.member = JSON.stringify(member)
        this.setState({
            member: member
        })
    },
    // Fires when a new member joins
    updateAudience(audience) {
        this.setState({
            audience: audience
        })
    },
    // Starts the presnetation
    start(presentation) {
        if(this.state.member.type === 'speaker')
            sessionStorage.title = presentation.title

        this.setState(presentation)
    },
    // Updates the question
    ask(question) {
        sessionStorage.answer = ''
        this.setState({
            currentQuestion: question
        })
    },
    // Listen for when we get inbound results
    updateResults(data) {
        this.setState({
            results: data
        })
    },
    // using ... activates JSX spread operator to pass all data down
    render() {
        const props = {...this.state}
        props.emit = this.emit
        return (
            <div>
                <Header {...this.state} />
                {React.cloneElement(this.props.children, props)}
            </div>
        )
    }
})

module.exports = TestNode
