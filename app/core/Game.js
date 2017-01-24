/* global THREE */
import CANNON from 'cannon';
import Actor from '../core/Actor';

class Game extends Actor {
  constructor() {
    super();
    
    this.gameTime = 0;

    this.gameStart = false;
    this.gameOver = false;
  }
  
  tick(delta) {
    super.tick(delta);
    
    this.gameTime += delta;
  }
}

module.exports = Game;
