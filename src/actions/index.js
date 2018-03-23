export const addHistory = (text) => {
  return {
    type: 'ADD_HISTORY',
    text
  }
}

export const updateState = (state) => {
  return {
    type: 'UPDATE_STATE',
    state
  }
}

export const addChatHistory = (text) => {
  return {
    type: 'ADD_CHAT_HISTORY',
    text
  }
}

<<<<<<< HEAD
export const incrementGameScore = (state) => {
  return {
    type: 'UPDATE_GAME_SCORE',
    state
=======
export const incrementGameScore = () => {
  return {
    type: 'UPDATE_GAME_SCORE'
>>>>>>> a408ef40cf50c9c0ac80879cf84248a2a79e4281
  }
}

export const updateChatState = (state) => {
  return {
    type: 'UPDATE_CHAT_STATE',
    state
  }
}

export const updateDeliveredMessages = (message) => {
  return {
    type: 'UPDATE_DELIVERED_MESSAGES',
    message
  }
}
