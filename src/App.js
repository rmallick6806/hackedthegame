import React, { Component } from 'react';
import './App.css';
import Terminal from './terminal/src';
import Bash from './terminal/src/bash.js';
import * as UpdatedCommands from './terminal/src/updatedCommands.js';
import * as OldCommands from './terminal/src/commands.js';
// import * as SnakePit from './snakePit/js/snakePit.js';

class App extends Component {
  constructor() {
    super();
    this.bash = new Bash();
    this.updateCommandsBatch = this.updateCommandsBatch.bind(this);
  }

  updateCommandsBatch(commands) {
    this.bash.updateCommandsBatch({}, commands);
  }

  componentDidMount() {
    require('./snakePit/js/snakePit.js');
  }

  render() {
    const initialHistory = [
      { value: 'Logging In...' },
      { value: 'Successful...' },
      { value: 'type `help` to see commands.'},
    ];

    let children = <canvas id='snakePit' height={400} width={400}></canvas>;
    // let children = null;

    return (
      <div className="App" id="terminal-mount">
        <Terminal prefix={'user2404712@home'} history={initialHistory} theme={'dark'} bash={this.bash}>
          {children}
        </Terminal>
      </div>
    );
  }
}

export default App;
