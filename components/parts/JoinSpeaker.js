import React from 'react'

var JoinSpeaker = React.createClass({
    // Retrieves the name out of the DOM node which contains the users name, we then emit back a
    // event to app-server and send back the new user object to be saved
    start() {
        var speakerName = React.findDOMNode(this.refs.name).value
        var title = React.findDOMNode(this.refs.title).value

        this.props.emit('start', { name: speakerName, title: title })
    },
    // In react, ref is used to reference inputs
    render() {
        return(
            <form action="javascript:void(0)" onSubmit={this.start}>
                <label>Full Name</label>
                <input ref="name" className="form-control" placeholder="Enter your full name..."
                required />
                <label>Presentation Title</label>
                <input ref="title" className="form-control" placeholder="Enter the presentations title..."
                required />
                <button className="btn btn-primary">Join</button>
            </form>
        )
    }
})

module.exports = JoinSpeaker
