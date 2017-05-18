import React, { Component } from 'react';
import SnakePit from '../snakePit/js/snakePitGame.js';

class SnakePitWrapper extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    let snakepit = new SnakePit();
    this.timeout = setTimeout(() => {
      snakepit.init();
      this.setState({finishedLoading: true})
      clearTimeout(this.timeout);
    }, 1000);
  }

  render() {
    return (
      <div className="snake-pit-wrapper">
        <div className='green-bar'> Loading Game... </div>
        <div className='green-bar'> {(this.state.finishedLoading) ? 'Finished loading...': null}</div>
        <canvas id='snakePit'></canvas>
        <div className='green-bar'> Press 'Space' to restart...</div>
        <div className='green-bar'/>
      </div>
    );
  }
}

export default SnakePitWrapper;
