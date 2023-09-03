#pragma glslify:noise= require('glsl-noise/simplex/3d')

uniform float uTime;
uniform float uCleanliness;
uniform float uAmplitudeX;
uniform float uAmplitudeY;
uniform vec3 uBrightness;
uniform vec3 uContrast;
uniform vec3 uOscilation;
uniform vec3 uPhase;

varying vec2 vUv;

vec2 random(vec2 p) {
  return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  float offsetX = vUv.x * 0.3 - uTime * 0.3;
  float offsetY = vUv.y + sin(vUv.x * 5.0) * 0.1 - sin(uTime * 0.5) + noise(vec3(vUv.x, vUv.y, uTime) * 0.5);
  offsetX += noise(vec3(offsetX, offsetY, uTime) * 5.0) * uAmplitudeX;
  offsetY += noise(vec3(offsetX, offsetX, uTime * 0.3)) * uAmplitudeY;
  
  float strength = noise(vec3(offsetX, offsetY, uTime * 0.5) * 2.0) * 0.03;
  strength *= smoothstep(strength, 0.5, 0.6);
  
  vec3 color = cosPalette(strength * 30.0, uBrightness, uContrast, uOscilation, uPhase);
  
  vec4 w = vec4(1.0, 1.0, 1.0, 1.0);
  vec4 b = vec4(0.0, 0.0, 0.0, 0.0);
  vec4 mix = mix(b, w, vUv.y);
  
  gl_FragColor = vec4(color, 0.2) * mix;
}
