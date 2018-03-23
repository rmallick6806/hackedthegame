import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import Terminal from './terminal/src';
import Bash from './terminal/src/bash.js';
import * as ChatCommands from './terminal/src/chatCommands.js';
import parentCommands from './parentCommands';
import SnakePitWrapper from './components/snakePitWrapper.js';
import { addHistory, updateState, addChatHistory, incrementGameScore, updateChatState, updateDeliveredMessages } from './actions';
import errors from './errors.js';
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
  constructor(props) {
    super(props);
    this.state = {
      snakePitRuns: 0,
      runSnakePit: false
    };

    this.bash = new Bash({}, parentCommands(this, DURATION_CONFIG));
    this.bashChat = new Bash({}, parentCommands(this, DURATION_CONFIG), ChatCommands, true);
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

    /*
    * Bash Chat is the view where the user is chatting with the 'hacker'
    * It uses the terminal component with slight style and logic tweaks
    */

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
          <div>{this.props.terminal.gameScore}</div>
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
        <div>{this.props.terminal.gameScore}</div>
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
      dispatch(incrementGameScore())
    },
    onUpdateChatState: (state) => {
      dispatch(updateChatState(state))
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
