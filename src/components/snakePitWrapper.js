import React, { Component } from 'react';
import Terminal from '../terminal/src';

class SnakePitWrapper extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    require('../snakePit/js/snakePit.js');
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
