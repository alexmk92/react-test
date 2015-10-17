    import React from 'react'
    import { Router, Link } from 'react-router'

    var NotFound = React.createClass({
        render() {
            return (
                <div id="not-found">
                    <h1>Whoops...</h1>
                    <p>Sorry, we could not find the page you requested.
                       Were you looking for one of these: </p>

                    <Link to={`/`}>Join as Audience</Link>
                    <Link to={`/speaker`}>Start the Presentation</Link>
                    <Link to={`/board`}>View the Board</Link>
                </div>
            )
        }
    })

    module.exports = NotFound
