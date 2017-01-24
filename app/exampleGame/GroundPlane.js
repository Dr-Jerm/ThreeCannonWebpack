/* global THREE */
import Actor from '../core/Actor';
import CANNON from 'cannon';


class GroundPlane extends Actor {
  constructor() {
    super();
    this.physicsScale = {
      x: 2.1,
      y: 1,
      z: 2.1
    };
    this.shape = new CANNON.Box(new CANNON.Vec3(this.physicsScale.x/2,this.physicsScale.y/2,this.physicsScale.z/2));
    
    let collisionMesh = new THREE.Mesh(
      new THREE.BoxGeometry( this.physicsScale.x, this.physicsScale.y, this.physicsScale.z),
      new THREE.CylinderGeometry(this.physicsScale.x/2, this.physicsScale.z/2 , this.physicsScale.y),
      new THREE.MeshStandardMaterial( { color: 0x777777, roughness: 1.0, metalness: 0, wireframe: false } )
    );
    collisionMesh.receiveShadow = true;
    //this.object3D.add(collisionMesh);
    this.mass = 0;
    this.body = new CANNON.Body({
      mass: this.mass
    });
    this.body.addShape(this.shape);
  }
}

module.exports = GroundPlane;