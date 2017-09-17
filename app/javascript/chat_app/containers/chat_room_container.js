/**
 * Containers are higher order functions. They usually have no UI to them.
 * There only job is to inject redux state and action handlers into dumb components.
 *
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as message_actions from '../actions/message_actions'
import MessagesComponent from '../components/messages_component'

function mapStateToProps(state) {
  const { messages } = state
  return {
    messages: messages  // pass the messages state to our component
  };
}

function mapDispatchToProps(dispatch) {
  return {
    on_submit: bindActionCreators(message_actions.add_message, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesComponent);

