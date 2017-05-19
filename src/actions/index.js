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
