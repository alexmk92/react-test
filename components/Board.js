import React from 'react'
import { BarChart } from 'react-d3'

var Display = require('./parts/Display')
var Board = React.createClass({
    // Convert input data into a format ready to be graphed by d3
    barGraphData(results) {
        /*
        return Object.keys(results).map(function(choice) {
            return {
                name: choice,
                values: [
                    x: 4,
                    y: results[choice]
                ]
            }
        })
        */
        var data = [
            {
                label : "series A",
                values : []
            }
        ]
        console.log(results);
        for(var key in results)
        {
            if(results.hasOwnProperty(key))
            {
                data[0].values.push({ x: key, y: results[key]})
                console.log("Key is %s, value is %s", key, results[key])
            }
        }
        return data
    },
    // Render the component
    render() {
        return (
            <div id="scoreboard">
                <Display if={this.props.status === 'connected' && this.props.currentQuestion}>
                    <h3>{this.props.currentQuestion.q}</h3>
                    <BarChart data={this.barGraphData(this.props.results)} title={this.props.currentQuestion.q} height={window.innerHeight * 0.6} width={window.innerWidth * 0.9} />
                </Display>

                <Display if={this.props.status === 'connected' && !this.props.currentQuestion}>
                    <h3>Awaiting a question from speaker...</h3>
                </Display>
            </div>
        )
    }
})

module.exports = Board
