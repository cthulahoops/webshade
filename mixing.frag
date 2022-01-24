#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
precision mediump int;

uniform vec2 resolution;

uniform vec3 A_COLOR;
uniform vec3 B_COLOR;
uniform vec3 C_COLOR;
uniform vec3 D_COLOR;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;

    vec3 color1 = mix(A_COLOR, B_COLOR, uv.x);
    vec3 color2 = mix(C_COLOR, D_COLOR, uv.x);
    vec3 color = mix(color1, color2, uv.y);

    gl_FragColor = vec4(color, 1.);
}
