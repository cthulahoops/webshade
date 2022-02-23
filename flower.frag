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

struct Polar {
  float theta;
  float distance;
};

Polar to_polar(vec2 uv) {
  return Polar(atan(uv.y, uv.x), length(uv));
}

float zero(float value) {
   return step(abs(value), 0.01);
}

float circle(Polar p, float radius) {
    return p.distance - radius;
}

void main() {
    vec2 uv = 2.0 * ((gl_FragCoord.xy - resolution/2.)/ resolution.y);

    Polar p = to_polar(uv);

    float sd = circle(p, 0.3 + 0.2 * sin(9. * p.theta)) * circle(p, 0.5);

    gl_FragColor = vec4(
      zero(sd),
      zero(sd),
      sd,
      1.);
}
