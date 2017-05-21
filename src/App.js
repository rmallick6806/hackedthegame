import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import Terminal from './terminal/src';
import Bash from './terminal/src/bash.js';
import * as UpdatedCommands from './terminal/src/updatedCommands.js';
import * as OldCommands from './terminal/src/commands.js';
import SnakePitWrapper from './components/snakePitWrapper.js';
import { addHistory, updateState } from './actions';
import { randomNumberWithMinimum } from './utils.js';
import errors from './errors.js';
import _ from 'lodash';

const DURATION_CONFIG = {
  firstHack: 15000,
  firstMessage: 3000
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
      }
    };

    this.bash = new Bash({}, parentCommands);
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
    const { runSnakePit } = this.state;
    const { terminal } = this.props;
    return (
      <div className="App" id="terminal-mount">
        <Terminal prefix={'user2404712@home'}
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
    terminal: state.terminal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateState: (state) => {
      dispatch(updateState(state))
    },
    onAddHistory: (text) => {
      dispatch(addHistory(text))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
