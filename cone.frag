#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
precision mediump int;

uniform vec2 resolution;

float sdCuboid(vec3 p, vec3 b, vec3 offset) {
  p = p - offset;
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)), 0.0);
}

float intersectionSDF(float a, float b) {
    return max(a, b);
}

float point_distance(vec2 p0, vec2 p1, vec2 p2) {
  float a = (p2.x - p1.x) * (p1.y - p0.y) - (p1.x - p0.x) * (p2.y - p1.y);
  float b = length(p2 - p1);
  return a / b;
}

float sdCone(vec3 p, float r, float h, vec3 offset) {
  float cube = sdCuboid(p, vec3(r, h / 2.0, r), offset + vec3(0., h/2., 0.));
  p = p - offset;
  float x = length(p.xz);

  float cone = point_distance(vec2(x, p.y), vec2(r, 0.), vec2(0., h));
  return intersectionSDF(cone, cube);
}


float zero(float x) {
  return step(x, 0.002) - step(x, -0.002);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;

    float cone = sdCone(vec3(uv, 0.), 0.3, 0.6, vec3(0., -0.3, 0.));
    float grid = max(zero(mod(uv.x, 0.1)), zero(mod(uv.y, 0.1)));
    gl_FragColor = vec4(grid, 0.2 * step(cone, 0.), zero(mod(cone, 0.1)), 1.);
}
