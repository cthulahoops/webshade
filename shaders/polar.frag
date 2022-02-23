#version 100

#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
precision mediump int;

uniform vec2 resolution;
uniform float time;

#define pi 3.141592

float zero(float value) {
   return step(value, 0.1) *  (1. - step(value, -0.1));
}

void main() {
    vec2 uv = 2.0 * ((gl_FragCoord.xy - resolution/2.)/ resolution.y);

    float angle = atan(uv.y, uv.x);
    float distance = length(uv);

    float t = ceil(distance / 0.2);

    float line = zero(sin(2. * t + time + 12.0 * angle) - 8. * (mod(distance, 0.2) - 0.1));

    gl_FragColor = vec4(
      line * sin(3.0 * angle),
      line * sin(3.0 * angle + 2.*pi / 3.),
      line * sin(3.0 * angle + 4.*pi / 3.),
      1.);
}
