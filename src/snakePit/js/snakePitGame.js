import _ from 'lodash';
import { controlsMap } from './entities/utils';
import Snake from './entities/snake';
import Food from './entities/food';
import Board from './entities/board';

// const p1Btn = document.getElementById('p1');
// const p2Btn = document.getElementById('p2');
// // Create the canvas
// const canvas = document.getElementById('snakePit');
// const ctx = canvas.getContext("2d");
//
// canvas.height = 400;
// canvas.width = 400;


// export const SnakePit = {};

class SnakePit {
  constructor() {
    this.canvas = document.getElementById('snakePit');
    this.ctx = this.canvas.getContext("2d");

    // game configuration
    this.canvas.height = 350;
    this.canvas.width = 350;
    this.running = true;
    this.snakes = [];
    this.pressed = {
      LEFT: false,
      RIGHT: false,
      UP: false,
      DOWN: false
    };
    this.then = performance.now();
    this.lag = 0.0;
    this.MS_PER_UPDATE = 16;

    // entities
    this.board = new Board();
    let snake1 = new Snake({
      x: 10,
      y: 20,
      speed: 5
    });
    this.snakes.push(snake1);
    this.food = new Food(this.canvas, this.board);

    this.init = this.init.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.resetPressed = this.resetPressed.bind(this);
    this.processInput = this.processInput.bind(this);
    this.renderLoop = this.renderLoop.bind(this);
    this.gameLoopP1 = this.gameLoopP1.bind(this);
  }

  init() {
    clearTimeout(this.timeout);
    this.bindEvents();
    _.forEach(this.snakes, (snake, index) => {snake.init()});
    this.food.place();
    this.gameLoopP1();
    this.renderLoop();
  }

  bindEvents() {
    document.addEventListener('keydown', (e) => {
      let key = e.keyCode;
      let direction = controlsMap[key];

      if (direction) {
        this.pressed[direction] = true;
      } else if (key === 32 && !this.running) {
        // Resets the game
        this.running = true;
        this.snakes = [];
        this.snake1 = new Snake({
          x: 5,
          y: 20,
          speed: 5
        });
        this.snakes.push(this.snake1);
        clearTimeout(this.timeout);
        this.init();
      }
    });
  }


  update(snake) {
    snake.advance(this.food);
    snake.checkCollision(this.canvas, this.board, this);
    snake.checkSelfCollision(this);
    this.resetPressed();
  }

  render(canvas, ctx, snakes, food, delta) {
    this.board.clear(canvas, ctx);
    this.board.draw(ctx, snakes, food, delta);
  }

  resetPressed() {
    this.pressed = _.mapValues(this.pressed, (pressed) => {
      return pressed = false;
    });
  }

  processInput(snake, index) {
    let newDirection = _.findKey(this.pressed, (pressed, direction) => {
      return this.pressed[direction] === true;
    });
    if (newDirection === undefined) {
      return;
    }
    snake.setDirection(newDirection, this.pressed);
  }

  renderLoop() {
    if (!this.running) return;
    requestAnimationFrame(this.renderLoop);
    let now = performance.now();
    let delta = this.now - this.then;
    this.then = this.now;

    this.lag += delta;
    this.render(this.canvas, this.ctx, this.snakes, this.food, 10);
  }

  gameLoopP1() {
    if (!this.running) return;
    let snake = this.snakes[0]
    this.timeout = setTimeout(() => {
      requestAnimationFrame(this.gameLoopP1);
    }, 1000 / snake.speed);
    this.processInput(snake, 0);
    this.update(snake);
  }
}

export default SnakePit;
// SnakePit.game().init();
