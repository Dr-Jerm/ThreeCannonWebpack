varying vec2 vUv;
varying float noise;
varying vec3 fNormal;
varying vec4 vColor;

uniform vec2 rippleOriginLeft;
uniform vec2 rippleOriginRight;
uniform float rippleSizeLeft;
uniform float rippleSizeRight;
uniform float falloff;

uniform float timeLeft;
uniform float timeRight;

void main() {
  fNormal = normal;
  vUv = uv;
  noise = 0.0;
  
  vec2 distLeft = ((rippleOriginLeft + 0.5) - uv); 
  float distLeftSquare = distLeft.x * distLeft.x + distLeft.y * distLeft.y;
  vec3 newPosition = position;
  float radiusLeftOutside = timeLeft;
  float radiusLeftInside = timeLeft - 0.09;
  float falloffLeft = falloff * (1.0 + distLeftSquare);

  vec2 distRight = ((rippleOriginRight + 0.5) - uv); 
  float distRightSquare = distRight.x * distRight.x + distRight.y * distRight.y;
  float radiusRightOutside = timeRight;
  float radiusRightInside = timeRight - 0.09;
  float falloffRight = falloff * (1.0 + distRightSquare);

  vColor = vec4(0.3, 0.5, 0.0, 1.0);
  vec4 colorLeft = vec4(0.0);
  vec4 colorRight = vec4(0.0);

  vec3 offsetLeft = vec3(0.0, 0.0, 0.0);
  vec3 offsetRight = vec3(0.0, 0.0, 0.0);

  if ( distLeftSquare < radiusLeftOutside * radiusLeftOutside &&
       distLeftSquare > radiusLeftInside * radiusLeftInside) {

    offsetLeft = vec3(0.0, rippleSizeLeft / (falloffLeft * falloffLeft), 0.0);
    colorLeft = vec4(30.0/vec3(falloffLeft * falloffLeft), 0.0);
  }
  if (distRightSquare < radiusRightOutside * radiusRightOutside &&
      distRightSquare > radiusRightInside * radiusRightInside) {

    offsetRight = vec3(0.0, rippleSizeRight / (falloffRight * falloffRight), 0.0);
    colorRight = vec4(30.0/vec3(falloffRight * falloffRight), 0.0);
  }

  vColor = vColor + colorRight + colorLeft;

  newPosition = newPosition + offsetLeft + offsetRight;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}

