#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
precision mediump int;

uniform vec2 resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;

    gl_FragColor = vec4(uv.x, uv.y, 0.5, 1);
}
