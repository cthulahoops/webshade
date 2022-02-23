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
   return float(abs(value) < 0.02);
}

struct Polar {
  float angle;
  float distance;
};

Polar to_polar(vec2 uv) {
  return Polar(atan(uv.x, -uv.y), length(uv));
}

float circle(Polar p, float radius) {
  return p.distance - radius;
}

void main() {
   vec2 uv = 2.0 * ((gl_FragCoord.xy - resolution/2.)/ resolution.y);
  
   Polar p = to_polar(uv);
   
   vec3 result = vec3(0.);
   for (int x = 3; x < 40; x++) {
     float line = zero(circle(p, 0.1 * float(x) * (pi + p.angle)));
     line += zero(circle(p, 0.1 * float(x) * (pi - p.angle)));
     result += vec3(0.05 * float(x), 0.2, 0.05 * -float(x)) * line;
   }
    result += vec3(0.1);
    gl_FragColor = vec4(result, 1.);
}
