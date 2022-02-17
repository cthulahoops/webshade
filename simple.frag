#version 100

#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
precision mediump int;

uniform vec2 resolution;

uniform vec3 BACKGROUND_COLOR;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;

    gl_FragColor = vec4((vec3(uv, 1.) * BACKGROUND_COLOR), 1.);
}
