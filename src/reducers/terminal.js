const initialState = {
  settings: { user: { username: 'home' } },
  history: [
    { value: 'Logging In...' },
    { value: 'Successful...' },
    { value: 'type `help` to see commands.'},
  ],
  structure: {},
  cwd: ''
}

const terminal = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_HISTORY':
      return {
        ...state,
        history: state.history.concat(action.text)
      }
      break;
    case 'UPDATE_STATE':
      return action.state
      break;
    default:
      return state
  }
}

export default terminal
