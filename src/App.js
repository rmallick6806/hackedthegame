import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import Terminal from './terminal/src';
import Bash from './terminal/src/bash.js';
import * as ChatCommands from './terminal/src/chatCommands.js';
import SnakePitWrapper from './components/snakePitWrapper.js';
import { addHistory, updateState, addChatHistory, incrementGameScore, updateChatState, updateDeliveredMessages } from './actions';
import { randomNumberWithMinimum } from './utils.js';
import errors from './errors.js';
import chatMessages from './chatMessages.js';
import _ from 'lodash';


const DURATION_CONFIG = {
  firstHack: 15000,
  firstMessage: 3000,
  logOnToChat: 1,
  logOnToChatSuccess: 2000,
  firstChatMessage: 3500,
  regularResponse: 5000,
  staggeredResponse: 3000
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      snakePitRuns: 0,
      runSnakePit: false
    };

    const parentCommands = {
      runSnakePit: () => {
        let time = (randomNumberWithMinimum(0) * 10000) + DURATION_CONFIG.firstHack;
        let snakePitRuns = this.state.snakePitRuns
        _.delay(() => this.errorInSnakePitGame(), time);
        this.setState({runSnakePit: true, snakePitRuns: snakePitRuns + 1 });
      },
      startBashChat: () => {
        this.setState({startBashChat: true});
        _.delay(() => {this.props.onAddChatHistory(chatMessages['logOn'])}, DURATION_CONFIG.logOnToChat);
        _.delay(() => {this.props.onAddChatHistory(chatMessages['logOnSuccess'])}, DURATION_CONFIG.logOnToChatSuccess);
        _.delay(() => {this.props.onAddChatHistory(chatMessages['first'])}, DURATION_CONFIG.firstChatMessage);
      },
      chatResponse: (value) => {
        let response = chatMessages[value];
        if (response.staggered) {
          let staggeredFunc = new Promise((resolve, reject) => {
            _.forEach(response.staggered, (message, idx) => {
              _.delay(() => {
                this.props.onAddChatHistory(message)
                if (idx === response.staggered.length - 1) {
                  resolve('Fire On Update Delivered Messages');
                }
              }, DURATION_CONFIG.staggeredResponse + (idx * 2000));
            });
          });
          staggeredFunc.then(() => this.props.onUpdateDeliveredMessages(value));
        } else {
          _.delay(() => {
            this.props.onAddChatHistory(chatMessages[value])
            this.props.onUpdateDeliveredMessages(value)
          }, DURATION_CONFIG.regularResponse);
        }
      }
    };

    this.bash = new Bash({}, parentCommands);
    this.bashChat = new Bash({}, parentCommands, ChatCommands, true);
    this.errorInSnakePitGame = this.errorInSnakePitGame.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.runSnakePit) {
      this.timer = null;
      clearTimeout(this.timer);
    }
  }

  updateCommandsBatch(commands) {
    this.bash.updateCommandsBatch({}, commands);
  }

  errorInSnakePitGame() {
    let snakePitRuns = this.state.snakePitRuns;
    if (snakePitRuns <= 2) {
      this.setState({runSnakePit: false});
      this.props.onAddHistory(errors['firstHack']);
      _.delay(() => {this.props.onAddHistory(errors['firstMessage'])}, DURATION_CONFIG.firstMessage);
    }
    if (snakePitRuns > 3) {
      return ;
    }
  }

  render() {
    const { runSnakePit, startBashChat } = this.state;
    const { terminal, bashChat } = this.props;

    if (startBashChat) {
      return (
        <div className="App" id="terminalMount">
          <Terminal key={'bash-chat'}
            prefix={'user2404712'}
            terminal={bashChat}
            theme={'dark'}
            bash={this.bashChat}
            onUpdateState={(state) => this.props.onUpdateChatState(state)}
            startBashChat={startBashChat}>
          </ Terminal>
          <div>
            {this.props.terminal.gameScore}
          </div>
        </div>
      );
    };

    return (
      <div className="App" id="terminalMount">
        <Terminal key={'terminal'}
          prefix={'user2404712@home'}
          terminal={terminal}
          theme={'dark'}
          bash={this.bash}
          onUpdateState={(state) => this.props.onUpdateState(state)}
          inputDisabled={runSnakePit}>
          {(runSnakePit) ? <SnakePitWrapper /> : null}
        </ Terminal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    terminal: state.terminal,
    bashChat: state.bashChat
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateState: (state) => {
      dispatch(updateState(state))
    },
    onUpdateChatState: (state) => {
      dispatch(updateChatState(state))
      dispatch(incrementGameScore(state.gameScore))
    },
    onAddHistory: (text) => {
      dispatch(addHistory(text))
    },
    onAddChatHistory: (text) => {
      dispatch(addChatHistory(text))
    },
    onUpdateDeliveredMessages: (msg) => {
      dispatch(updateDeliveredMessages(msg))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
