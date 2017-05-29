const initialState = {
  settings: { user: { username: 'home' } },
  history: [],
  structure: {},
  deliveredMessages: {},
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
    case 'UPDATE_DELIVERED_MESSAGES':
      let value = (state.deliveredMessages[action.message] !== undefined) ? state.deliveredMessages[action.message] + 1 : 1;
      console.log(action.message, value, state.deliveredMessages);
      return {
        ...state,
        deliveredMessages: {
          ...state.deliveredMessages,
          [action.message]: value
        }
      }
      break;
    default:
      return state
  }
}

export default bashChat
