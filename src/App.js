import React, { Component } from 'react';
import './App.css';
import Terminal from './terminal/src';
import Bash from './terminal/src/bash.js';
import * as UpdatedCommands from './terminal/src/updatedCommands.js';
import * as OldCommands from './terminal/src/commands.js';
import SnakePitWrapper from './components/snakePitWrapper.js';

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.timer = null;

    const parentCommands = {
      runSnakePit: () => {
        clearTimeout(this.timer);
        this.timer = null;
        this.timer = setTimeout(() => this.firstHack(), 5000);
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
      runSnakePit: false,
      history: this.state.history.concat({value: 'Game ran out of memory...'})
    });
    clearTimeout(this.timer);
    this.timer = null;
  }

  componentDidUpdate() {
    if (!this.state.runSnakePit) {
      this.timer = null;
      clearTimeout(this.timer);
      console.log(this.timer);
    }
  }

  componentDidMount() {
    this.setState({
      history: [
        { value: 'Logging In...' },
        { value: 'Successful...' },
        { value: 'type `help` to see commands.'},
      ]
    });
  };

  render() {
    const { runSnakePit, history } = this.state;

    return (
      <div className="App" id="terminal-mount">
        <Terminal prefix={'user2404712@home'} history={history} theme={'dark'} bash={this.bash} inputDisabled={runSnakePit}>
          {(runSnakePit) ? <SnakePitWrapper /> : null}
        </ Terminal>
      </div>
    );
  }
}

export default App;
