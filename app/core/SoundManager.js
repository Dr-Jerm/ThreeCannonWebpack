/* global THREE */
import Actor from '../core/Actor';

var soundFiles = [
  'pop.ogg'
];

class SoundManager extends Actor {
  constructor(listener) {
    super();
    var self = this;
    this.soundDictionary = {};
    
    for (let i = 0; i < soundFiles.length; i++) {
      let path = '../sound/'+soundFiles[i];
      
      var audioLoader = new THREE.AudioLoader();
      var sound1 = new THREE.PositionalAudio( listener );
      (function(name) {
        audioLoader.load( path, function( buffer ) {
      	sound1.setBuffer( buffer );
      	sound1.setRefDistance( 20 );
      	self.soundDictionary[name];
      });})(soundFiles[i]);
      this.object3D.add( sound1 );
    }
    
   
    document.body.onkeyup = function(e){
      if(e.keyCode == 65){
        console.log("I pressed a");
        self.play3DSound(new THREE.Vector3(), 1);
      }
    };
  }
  
  play3DSound(name, vector3Location, floatScale) {
    let sound = this.soundDictionary[name];
    if (!sound) return;
    
    sound.position = vector3Location;
    sound.play();
  }
  
  tick(delta) {
    super.tick(delta);

  }
}

module.exports = SoundManager;
