/* global THREE */
import Globals from './Globals';

class Actor {
  constructor() {
    this.ticks = false;
    this.effectedByPause = true;
    
    // THREE.js
    this.object3D = new THREE.Object3D();
    this.object3D.name = this.constructor.name;
    // Cannon.js
    this.physicsEnabled = false;
    this.body = null;
    
    // this could probably be cleaner
    var self = this;
    setTimeout(function () {
      self.beginPlay();
    });
  }
  
  tick(delta) {
    this.syncCollisionBodyAndRenderable();
  }
  
  destroy() {
    Globals.scene.removeTickingActor(this);
    recursiveDispose(Globals.scene, this.object3D);
    // Globals.scene.remove(this.object3D);
    Globals.world.remove(this.body);
  }
  
  beginPlay() {
    if (this.ticks) {
      Globals.scene.tickingActors.push(this);
    }
    if (this.body != null) {
      Globals.world.add(this.body);
    }
    Globals.scene.add(this.object3D);  
  }

  getPosition()
  {
    return this.object3D.position.clone();
  }

  getForwardVector()
  {
    var _currentPos = this.object3D.position.clone();
    var _currentRot = this.object3D.rotation.clone();

    var _originVect = new THREE.Vector3(1,0,0);

    var _fwdX = _originVect.x * Math.cos(_currentRot.y);
    var _fwdZ = _originVect.x * Math.sin(_currentRot.y);

    var forwardVect = new THREE.Vector3(_fwdX,0,-_fwdZ);

    return forwardVect;
  }
  
  syncCollisionBodyAndRenderable () {
    if (!this.body) return;
    
    if (this.physicsEnabled) {
    this.object3D.position.copy(this.body.position);
    this.object3D.position.y = this.object3D.position.y;
    this.object3D.quaternion.copy(this.body.quaternion);
    } else if (!this.physicsEnabled) {
      this.body.position.copy(this.object3D.position);
      this.body.quaternion.copy(this.object3D.quaternion);
    }
  }
}

var recursiveDispose = function (parent, object3D) {
  if (!object3D) return;
  
  if (object3D.material) object3D.material.dispose();
  if (object3D.geometry) object3D.geometry.dispose();
  
  if (object3D.children && object3D.children.length > 0) {
    for (let i = 0; i < object3D.children.length; i++) {
      recursiveDispose(object3D, object3D.children[i]);
    }
  }
  
  parent.remove(object3D);
};

module.exports = Actor;