/* global WEBVR */
/* global THREE */
import Globals from '../core/Globals';
import Scene from '../core/Scene'
import Controller from '../core/VRController';
import Skysphere from './Skysphere';
import GroundPlane from './GroundPlane';
import Sheep from './Sheep';

class ExampleScene extends Scene {
  constructor() {
    super();
    
    this.add(new THREE.HemisphereLight(0x808080, 0x606060));
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 6, 0);
    light.rotation.set(2, 2, 5.0);
    
    light.castShadow = true;
    light.shadow.camera.zoom = 4;
    light.shadow.camera.top = 2;
    light.shadow.camera.bottom = -2;
    light.shadow.camera.right = 2;
    light.shadow.camera.left = -2;
    
    light.shadow.mapSize.set(4096, 4096);
    this.add(light);
    
    if (WEBVR.isAvailable() === true) {
      this.controls = new THREE.VRControls(this.camera);
      this.controls.standing = true;
      
      let controller1 = new Controller(0, this.controls);
      this.tickingActors.push(controller1);
      this.add(controller1);
      let controller2 = new Controller(1, this.controls);
      this.add(controller2);
      this.tickingActors.push(controller2);
      this.offsetY = 1.7;
    } else {
      this.camera.position.y = 1.5;
      this.camera.position.z = 0.5;
      this.controls = new THREE.OrbitControls( this.camera, Globals.renderer.domElement );
      this.controls.enableZoom = true;
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.25;
      this.offsetY = 0;
      this.mouse = { // this should be refactored into an input class
        x: 0,
        y: 0
      };
    }
    
    new Skysphere();
    
    this.groundPlane = new GroundPlane(this, this.world);
    this.groundPlane.object3D.position.set(0,this.offsetY, 0);
    this.groundPlane.body.position.set(0,this.offsetY, 0);
    
    this.numSheep = 10;
    for(var i=0; i<this.numSheep; i++)
    {
        var sheep = new Sheep();
        sheep.object3D.position.y = 0.53 + this.offsetY;
    }    
    
    document.body.onkeyup = function(e){ // this should be refactored into an input class
      if(e.keyCode == 32){
        console.log("I pressed spacebar");
      }
    };
    if (WEBVR.isAvailable() === false) { // this should be refactored into an input class
      document.body.onmousemove = (e)=>{
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      };
  
      document.body.onmousedown = (e)=>{ // this should be refactored into an input class
        if(e.button == 0)
        {
          console.log("Clicked Left Mouse Button.");
        }
      };
    }
  }

  tick (delta) {
    super.tick(delta);
  }
}

module.exports = ExampleScene;