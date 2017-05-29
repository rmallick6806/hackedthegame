var chatMessages = {
  logOn: [
    { value: 'Connecting to 972.816.203...' }
  ],
  logOnSuccess: [
    { value: 'Success!'},
    { value: 'Welcome to Bash Chat v0.23' },
    { value: 'type `quit` to return to terminal.'},
  ],
  first: {
    value: 'Thank god, finally. Where the fuck have you been?',
    type: 'hacker-response'
  },
  whoAreYou: {
    staggered: [
      {value: 'What?? You know who I am...', type: 'hacker-response'},
      {value: 'Look I don\'t have a lot of time. They are starting to watch me closely..', type: 'hacker-response'},
    ]
  },
  confusedResponse: {
    value: 'What? You\'re not making any sense',
    type: 'hacker-response'
  }

};

export default chatMessages;
