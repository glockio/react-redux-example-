// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import { render, } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers} from 'redux'

import messages_reducer from '../chat_app/reducers/messages_reducer'
import ChatRoomContainer from "../chat_app/containers/chat_room_container"

/**

The store is where your application state is going to live. You can access it via store.getState()

The store also holds your state reducer. A reducer is just a function that knows how to consume actions/payloads and update the state.

Reducers have the following function signature (current_state, action={}) => new_state // Note you must ALWAYS returns a new state

The current_state will automatically be passed to the reducer by redux and the action argument will be something you define.
You can make the action payload any shape you want. However, there are some comunity standards on what they should look like.

```
 action = {
   type: 'ADD_USER'
   payload: {
    name: "Greg Laughlin"
    age: "27"
    gender: "Male"
   }
   meta: {} ** optional
   error: false ** optional
 }
```
You can find more on the action standards here: https://github.com/acdlite/flux-standard-action


**/


/**
  In small apps having one reducer is fine.
  But for larger applications what you can do is combine reducers.
  So each reducer handles only a slice of the application state.

  When you use combineReducers each reducer function will be called with the action payload.

  So in our example below when I do:

  store.dispatch { type: "ADD_MESSAGE", payload: { name: "HELLO WORLD"} }

   1. First the messages reducer will be called. This reducer knows how to handle this action and updates the state
   2. Then the users action will be called. This reducer does not handle the ADD_MESSAGE action so it simply returns the new state.


  You can check out the source code to combine reducers. But the main concept is it returns a single reducer function that calls all other reducers with a slice of the state.

**/
let combined_reducers = combineReducers({
  messages: messages_reducer,
  users: (state=[], action) => {
    return state // placeholder to demo combine reducers
  },
  __debug: (state={}, action) => {
    switch(action.type) {
      case "INIT":
        return({...state, loaded_at: new Date })
      default:
        return  state
    }
  }
})

let store = createStore(combined_reducers) // Create our store

window.$store = store // so you can debug locally


// Manually dispatch and action
// In large applications where the action payloads get complex you define an action creator function in the actions folder.
store.dispatch({type: "INIT"})

console.log(store.getState()) // Log The state

const ChatApp = props => (
  <div>
    <h1>Chat App</h1>
    <ChatRoomContainer/>
  </div>
)

document.addEventListener('DOMContentLoaded', () => {

  render(
    <Provider store={store}>
        <ChatApp/>
    </Provider>,
    document.getElementById("app")
  )
})
