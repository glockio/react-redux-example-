


let default_state = []

export default (state=default_state, action={}) => {
  switch (action.type) {
     case 'ADD_MESSAGE':
       return [
         ...state,
         action.payload
       ]
     default:
       return state
  }
}
