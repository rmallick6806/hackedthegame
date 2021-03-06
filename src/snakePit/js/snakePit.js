import _ from 'lodash';
import { controlsMap } from './entities/utils';
import Snake from './entities/snake';
import Food from './entities/food';
import Board from './entities/board';

const p1Btn = document.getElementById('p1');
const p2Btn = document.getElementById('p2');
// Create the canvas
const canvas = document.getElementById('snakePit');
const ctx = canvas.getContext("2d");

canvas.height = 350;
canvas.width = 350;


export const SnakePit = {};

SnakePit.game = function() {
  let game = this;

  // game configuration
  this.running = true;
  this.snakes = [];
  this.pressed = {
    LEFT: false,
    RIGHT: false,
    UP: false,
    DOWN: false
  };
  let then = performance.now();
  let lag = 0.0;
  const MS_PER_UPDATE = 16;

  // entities
  let board = new Board();
  let snake1 = new Snake({
    x: 5,
    y: 20,
    speed: 5
  });
  let snake2 = new Snake({
    x: 20,
    y: 50,
    speed: 5
  });
  this.snakes.push(snake1);
  this.food = new Food(canvas, board);

  function init() {
    clearTimeout(game.timeout);
    bindEvents();
    _.forEach(game.snakes, (snake, index) => {
      snake.init();
    });
    game.food.place();
    gameLoopP1();
    renderLoop();
  }

  function update(snake) {
    snake.advance(game.food);
    snake.checkCollision(canvas, board, game);
    snake.checkSelfCollision(game);
    resetPressed();
  }

  function render(canvas, ctx, snakes, food, delta) {
    board.clear(canvas, ctx);
    board.draw(ctx, snakes, food, delta);
  }

  function bindEvents() {
    document.addEventListener('keydown', (e) => {
      let key = e.keyCode;
      let direction = controlsMap[key];

      if (direction) {
        game.pressed[direction] = true;
      } else if (key === 32 && !game.running) {
        // Resets the game
        game.running = true;
        game.snakes = [];
        snake1 = new Snake({
          x: 5,
          y: 20,
          speed: 5
        });
        game.snakes.push(snake1);
        clearTimeout(game.timeout);
        init();
      }
    });
  }

  function resetPressed() {
    game.pressed = _.mapValues(game.pressed, (pressed) => {
      return pressed = false;
    });
  }

  function processInput(snake, index) {
    let newDirection = _.findKey(game.pressed, (pressed, direction) => {
      return game.pressed[direction] === true;
    });
    if (newDirection === undefined) {
      return;
    }
    snake.setDirection(newDirection, game.pressed);
  }

  function renderLoop() {
    if (!game.running) return;
    requestAnimationFrame(renderLoop);
    let now = performance.now();
    let delta = now - then;
    then = now;

    lag += delta;

    while (lag >= MS_PER_UPDATE) {
      render(canvas, ctx, game.snakes, game.food, 10);
      lag -= MS_PER_UPDATE
    }
  }

  function gameLoopP1() {
    if (!game.running) return;
    let snake = game.snakes[0]
    game.timeout = setTimeout(() => {
      requestAnimationFrame(gameLoopP1);
    }, 1000 / snake.speed);
    processInput(snake, 0);
    update(snake);
  }

  return {
    init: init
  }
};

SnakePit.game().init();
