import React from 'react'
import { Link } from 'react-router'

var Join = React.createClass({
    // Retrieves the name out of the DOM node which contains the users name, we then emit back a
    // event to app-server and send back the new user object to be saved
    join() {
        var memberName = React.findDOMNode(this.refs.name).value
        this.props.emit('join', { name: memberName })
    },
    // In react, ref is used to reference inputs
    render() {
        return(
            <form action="javascript:void(0)" onSubmit={this.join}>
                <label>Full Name</label>
                <input ref="name" className="form-control" placeholder="Enter your full name..."
                required />
                <button className="btn btn-primary">Join</button>
                <Link to={`/speaker`}>Join as speaker</Link>
                <Link to={`/board`}>Go to the answer board</Link>
            </form>
        )
    }
})

module.exports = Join
