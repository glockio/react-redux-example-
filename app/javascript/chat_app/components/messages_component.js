
import React from 'react'
import Message from "../components/message_component"


// For the form here we are using a controlled component and not storing the state in redux. It is Ok to do w.e one you feel is best.

class MessagesComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = { new_message: "" }
  }

  onType(e) {
    this.setState({new_message: e.target.value})
  }

  onSubmit() {
    this.props.on_submit(this.state.new_message)
    this.setState({new_message: ''}) // Clear input
  }

  render(){
    const { messages } = this.props
    return(
      <div>
        <h3>Messages List</h3>
        <ul>
          { messages.map((message) => <Message {...message} />) }
        </ul>
        <br/>
        <input type="text" value={this.state.new_message} onChange={(e) => this.onType(e)} />

        <button onClick={ () => this.onSubmit() }> Submit </button>
      </div>
    )
  }
}


export default  MessagesComponent