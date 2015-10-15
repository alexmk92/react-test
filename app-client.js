import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'

var TestNode = require('./components/TestNode')
var Audience = require('./components/Audience')
var Speaker = require('./components/Speaker')
var Board = require('./components/Board')

/*
var routes = (
    <Route handler={TestNode}>
        // On application launch show the audience Route
        <DefaultRoute handler={Audience} />
        <Route name="speaker" path="speaker" handler={Speaker}></Route>
        <Route name="board" path="board" handler={Board}></Route>
    </Route>
)
*/

// Render the defined Route from the URL
ReactDOM.render((
    <Router>
        <Route path="/" component={TestNode}>
            <IndexRoute component={Audience} />
            <Route path="speaker" component={Speaker} />
            <Route path="board" component={Board} />
        </Route>
    </Router>
), document.getElementById('react-container'))
