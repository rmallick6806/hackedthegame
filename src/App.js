import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import Terminal from './terminal/src';
import Bash from './terminal/src/bash.js';
import * as UpdatedCommands from './terminal/src/updatedCommands.js';
import * as OldCommands from './terminal/src/commands.js';
import SnakePitWrapper from './components/snakePitWrapper.js';
import { addHistory, updateState } from './actions';

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.timer = null;

    const parentCommands = {
      runSnakePit: () => {
        clearTimeout(this.timer);
        this.timer = null;
        this.timer = setTimeout(() => this.firstHack(), 15000);
        this.setState({runSnakePit: true});
      }
    };
    this.bash = new Bash({}, parentCommands);
  }

  updateCommandsBatch(commands) {
    this.bash.updateCommandsBatch({}, commands);
  }

  firstHack() {
    this.setState({
      runSnakePit: false
    });
    let text = {value: 'Game has no memory...'};
    this.props.onAddHistory(text);
    clearTimeout(this.timer);
    this.timer = null;
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
