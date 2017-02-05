/* global THREE */
import Actor from '../core/Actor';

class Skysphere extends Actor {
  constructor() {
    super();
    
    var self = this;
    var loader = new THREE.OBJLoader();
    loader.setPath('./models/obj/');
    loader.load('skysphere.obj', function(object) {
      var loader = new THREE.TextureLoader();
      loader.setPath('./textures/');
      
      var skysphere = object.children[0];
      skysphere.material.map = loader.load(
        'skysphereDiffuse.png'
      );
      
      self.object3D.add(skysphere.clone());
    });
  }
}

module.exports = Skysphere;