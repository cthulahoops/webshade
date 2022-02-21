#version 100

#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
precision mediump int;

uniform vec2 resolution;

#define pi 3.141592

void main() {
    vec2 uv = 2.0 * ((gl_FragCoord.xy - resolution/2.)/ resolution.y);

    float angle = atan(uv.y, uv.x);
    float distance = length(uv);

    float red = 1. - step(sin(12.0 * angle) - distance, 0.);
    float green = 1. - step(sin(12.0 * angle + 2.*pi/3.) - distance, 0.);
    float blue = 1. - step(sin(12.0 * angle + 4.*pi / 3.) - distance, 0.);

    gl_FragColor = vec4(red, green, blue, 1.);
}
