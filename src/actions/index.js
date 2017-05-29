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
