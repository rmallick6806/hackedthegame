import React, { Component } from 'react';
import Terminal from '../terminal/src';
import SnakePit from '../snakePit/js/snakePit2.js';

class SnakePitWrapper extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let snakepit = new SnakePit();
    snakepit.init();
  }

  render() {
    return (
      <div className="snake-pit-wrapper">
        <div className='green-bar'> Loading Game... </div>
        <div className='green-bar'> Finished loading...</div>
        <canvas id='snakePit'></canvas>
        <div className='green-bar'> Press 'Space' to restart...</div>
        <div className='green-bar'/>
      </div>
    );
  }
}

export default SnakePitWrapper;
