const initialState = {
  settings: { user: { username: 'home' } },
  gameScore: 0,
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
      case 'UPDATE_GAME_SCORE':
      console.log(action.state, state)
      return {
        ...state,
<<<<<<< HEAD
        gameScore: state.gameScore+1
=======
        gameScore: state.gameScore + 1
>>>>>>> a408ef40cf50c9c0ac80879cf84248a2a79e4281
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
