/* global WEBVR */
/* global THREE */
import Globals from './core/Globals';
import ExampleScene from './exampleGame/ExampleScene.js';

if (WEBVR.isAvailable() === false) {
  // document.body.appendChild(WEBVR.getMessage());
}

let webGLRenderer;
let vrRenderer;

let init = function () {
	let container = document.createElement('div');
	document.body.appendChild(container);
	
  
  webGLRenderer = new THREE.WebGLRenderer({ antialias: true });
  webGLRenderer.setPixelRatio(window.devicePixelRatio);
  webGLRenderer.setSize(window.innerWidth, window.innerHeight);
  webGLRenderer.shadowMap.enabled = true;
  webGLRenderer.gammaInput = true;
  webGLRenderer.gammaOutput = true;
  container.appendChild(webGLRenderer.domElement);
  if (WEBVR.isAvailable() === true) {
    vrRenderer = new THREE.VREffect(webGLRenderer);
    document.body.appendChild(WEBVR.getButton(vrRenderer));
    Globals.renderer = vrRenderer;
  } else {
    Globals.renderer = webGLRenderer;
  }
  Globals.scene = new ExampleScene();
  
  window.addEventListener('resize', onWindowResize, false);
};

let time;
let delta = 0;
let tick = function () {
  if (WEBVR.isAvailable() === true) {
    vrRenderer.requestAnimationFrame(tick);
  } else {
    window.requestAnimationFrame(tick);
  }
  let now = new Date().getTime();
  delta = (now - (time || now))/1000;
  time = now;
  
  if (delta > 0) {
    Globals.scene.tick(delta);
  }
  
  Globals.renderer.render(Globals.scene, Globals.scene.camera);
};

let onWindowResize = function() {
  Globals.scene.camera.aspect = window.innerWidth/window.innerHeight;
  Globals.scene.camera.updateProjectionMatrix();
  Globals.renderer.setSize(window.innerWidth, window.innerHeight);
};

init();
tick();
