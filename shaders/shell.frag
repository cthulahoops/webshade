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
  float angle;
  float distance;
};

Polar to_polar(vec2 uv) {
  return Polar(atan(uv.y, uv.x) + pi, length(uv));
}

float zero(float value) {
   return smoothstep(0.02, 0.04, abs(value));
}

float circle(Polar p, float radius) {
    return p.distance - radius;
}

vec3 shell(Polar p) {
    float band_spacing = 0.1;
    float band = p.angle - p.distance;
    float shell = step(0.02 * p.angle, p.distance) - step(0.15 * p.angle, p.distance);
    float sd = shell * zero(mod(band, band_spacing));
    return vec3(
      0.0,
      sd * (1.0 - mod(0.1 * p.angle, 1.0)),
      sd * fract(sin(floor((band)/ band_spacing)* 192840.0)));
}

void main() {
    vec2 uv = 2.0 * ((gl_FragCoord.xy - resolution/2.)/ resolution.y);

    Polar p = to_polar(uv);

    gl_FragColor = vec4(shell(p), 1.);
}
