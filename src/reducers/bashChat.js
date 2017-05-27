const initialState = {
  settings: { user: { username: 'home' } },
  history: [],
  structure: {},
  cwd: ''
}

const bashChat = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CHAT_HISTORY':
      return {
        ...state,
        history: state.history.concat(action.text)
      }
      break;
    case 'UPDATE_CHAT_STATE':
      return action.state
      break;
    default:
      return state
  }
}

export default bashChat
