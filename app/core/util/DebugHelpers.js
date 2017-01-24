/* global THREE */
var DebugHelpers = {};

DebugHelpers.drawLine = function (object3D, startVec, endVec, color, duration) {
   if (!object3D || !startVec || !endVec) return;
    
    color = color || Math.random() * 0xffffff;
    
    var material = new THREE.LineBasicMaterial({
      color: color
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      startVec,
      endVec
    );

    var _line = new THREE.Line( geometry, material ); 
    object3D.add( _line );
    
    if (duration && duration > 0)
    (function (obj3D, lineRef) {
        setTimeout(function () {
            obj3D.remove(lineRef);
        }, duration);
    })(object3D, _line);
    
    return _line;
};

module.exports = DebugHelpers;