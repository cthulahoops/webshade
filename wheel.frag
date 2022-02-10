#version 100

#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
precision mediump int;

uniform vec2 resolution;
uniform vec2 camera_rotation;

void main() {
    vec2 uv = 2.0 * (gl_FragCoord.xy / resolution - 0.5);

    gl_FragColor = vec4(mod(atan(uv.x / uv.y) + camera_rotation.y, 3.141592 / 3.3), 0, 0, 1.);
}
