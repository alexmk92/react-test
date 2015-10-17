import React from 'react'

var Display = require('./Display')
var Ask = React.createClass({
    getInitialState() {
        return {
            choices: [],
            answer: undefined
        }
    },
    // When the component is added to DOM
    componentWillMount() {
        this.initialiseChoices()
    },
    // When component changes
    componentWillReceiveProps() {
        this.initialiseChoices()
    },
    // Shift the q key from the array so we only have choices remianing
    initialiseChoices(){
        var choices = Object.keys(this.props.question)
        choices.shift()
        this.setState({
            choices: choices,
            answer: sessionStorage.answer
        })
    },
    // append different coloured buttons to the DOM
    addChoiceButton(choice, i) {
        var buttonTypes = ['primary', 'success', 'warning', 'danger']
        return (
            <button key={i} className={"col-xs-12 col-sm-6 btn btn-" + buttonTypes[i]} onClick={this.select.bind(null, choice)}>
                {choice} : {this.props.question[choice]}
            </button>
        )
    },
    //
    select(choice) {
        this.setState({
            answer: choice
        })
        sessionStorage.answer = choice
        this.props.emit('answer', {
            question: this.props.question,
            choice: choice
        })
    },
    render() {
        return (
            <div id="currentQuestions">
                <Display if={!this.state.answer}>
                    <h2>{this.props.question.q}</h2>
                    <div className="row">
                        {this.state.choices.map(this.addChoiceButton)}
                    </div>
                </Display>
                <Display if={this.state.answer} >
                    <h3>You answered: {this.state.answer}</h3>
                    <p>{this.props.question[this.state.answer]}</p>
                </Display>
            </div>
        )
    }
})

module.exports = Ask
