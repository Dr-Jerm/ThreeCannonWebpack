/* global THREE */
import CANNON from 'cannon';


var MathHelpers = {};

MathHelpers.threeVec3ToCannonVec3 = function (threeVec3) {
  return new CANNON.Vec3(threeVec3.x, threeVec3.y, threeVec3.z);
};

MathHelpers.cannonVec3ToThreeVec3 = function (cannonVec3) {
  return new THREE.Vector3(cannonVec3.x, cannonVec3.y, cannonVec3.z);
};

MathHelpers.randFloatRange = function(min, max) {
  return Math.random()*(max-min+1)+min;
};

MathHelpers.randRange = function(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

MathHelpers.clamp = function(val, min, max)
{
  return Math.min(Math.max(min, val), max);
};


module.exports = MathHelpers;