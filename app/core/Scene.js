/* global WEBVR */
/* global THREE */
import CANNON from 'cannon';
import Globals from './Globals';
import Game from './Game';
import SoundManager from './SoundManager';

class Scene extends THREE.Scene {
  constructor() {
    super();
    this.controls = null;
    this.bPause = false;
    this.tickingActors = [];

    Globals.world = new CANNON.World();
    Globals.world.gravity.set(0,-9.8,0);
    Globals.world.broadphase = new CANNON.NaiveBroadphase();
    Globals.world.solver.iterations = 10;

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth/window.innerHeight,
      0.1,
      10000
    );
    var listener = new THREE.AudioListener();
	  this.camera.add( listener );
    this.add(this.camera);
      
    Globals.soundManager = new SoundManager(listener);
    Globals.game = new Game();
    
  }
  
  tick (delta) {
    Globals.world.step(delta);
    this.controls.update();
    tickActors(this.tickingActors, delta);
  }
  
  removeTickingActor (actor) {
    let index = this.tickingActors.indexOf(actor);
    if (index > -1) {
      this.tickingActors.splice(index, 1);
    }
  }
}

let tickActors = function (actors, delta) {
  for (let i = 0; i < actors.length; i++) {
    let actor = actors[i];
    if (actor.ticks && actor.tick) {
      if (!this.bPause) { // not paused
        actor.tick(delta);
      } else if (this.bPause&& !actor.effectedByPause) { // is paused but actor still ticks
        actors[i].tick(delta);
      }
    }
  }
};

module.exports = Scene;