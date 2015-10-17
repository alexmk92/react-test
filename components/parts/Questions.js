import React from 'react'

var Questions = React.createClass({
    // Emits a question to the server to broadcast for audience to answer
    askQuestion(question) {
        this.props.emit('ask', question)
    },
    // Callback function for map, called once for each row
    addQuestion(question, i) {
        return (
            <div key={i} className="col-xs-12 col-sm-6 col-md-3">
                <span onClick={this.askQuestion.bind(null, question)}>{question.q}</span>
            </div>
        )
    },
    render() {
        return (
            <div id="questions" className="row">
                <h2>{this.props.questions.length} Questions</h2>
                {this.props.questions.map(this.addQuestion)}
            </div>
        )
    }
})

module.exports = Questions
