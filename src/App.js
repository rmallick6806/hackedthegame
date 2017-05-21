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

class App extends Component {
  constructor() {
    super();
    this.state = {
      snakePitRuns: 0,
      runSnakePit: false
    };
    this.timer = null;

    const parentCommands = {
      runSnakePit: () => {
        let time = (randomNumberWithMinimum(0) * 10000) + 15000;
        let snakePitRuns = this.state.snakePitRuns
        clearTimeout(this.timer);
        this.timer = null;
        this.timer = setTimeout(() => this.errorInSnakePitGame(), time);
        this.setState({runSnakePit: true, snakePitRuns: snakePitRuns + 1 });
      }
    };

    this.bash = new Bash({}, parentCommands);
  }

  updateCommandsBatch(commands) {
    this.bash.updateCommandsBatch({}, commands);
  }

  errorInSnakePitGame() {
    clearTimeout(this.timer);
    this.timer = null;

    let snakePitRuns = this.state.snakePitRuns;
    if (snakePitRuns <= 2) {
      this.setState({runSnakePit: false});
      this.props.onAddHistory(errors['firstHack']);
      _.delay(() => {this.props.onAddHistory(errors['firstMessage'])}, 3500);
    }
    if (snakePitRuns > 3) {
      return ;
    }
  }

  componentDidUpdate() {
    if (!this.state.runSnakePit) {
      this.timer = null;
      clearTimeout(this.timer);
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
