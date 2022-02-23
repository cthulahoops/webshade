#version 100

#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
precision mediump int;

uniform vec2 resolution;
uniform float time;
uniform vec2 camera_rotation;

#define pi 3.141592

float zero(float value) {
   float thickness = camera_rotation.y;
   return step(value, thickness) *  (1. - step(value, -thickness));
}

void main() {
    vec2 uv = 2.0 * ((gl_FragCoord.xy - resolution/2.)/ resolution.y);

    float angle = atan(uv.y, uv.x);
    float distance = camera_rotation.x * length(uv);

    float t = ceil(distance / 0.2);

    float line = zero(sin(2. * t + t *  time + angle) - distance);

    gl_FragColor = vec4(
      line * sin(3.0 * angle),
      line * sin(3.0 * angle - time ),
      line * sin(3.0 * angle + time ),
      1.);
}
