#version 100

#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
precision mediump int;

uniform vec2 resolution;
uniform float time;

const int MAX_MARCHING_STEPS = 255;
const float PRECISION = 0.001;
const float MIN_DIST = 0.005;
const float MAX_DIST = 100.0;

struct Surface {
  float distance;
  vec3 color;
  vec3 reflectance;
};

struct Ray {
  vec3 origin;
  vec3 direction;
};

Surface sdSphere(vec3 p, float r, vec3 offset, vec3 color, vec3 reflectance)
{
  return Surface(length(p - offset) - r, color, reflectance);
}

Surface sdCube(vec3 p, float b, vec3 offset, vec3 color, vec3 reflectance) {
  p = p - offset;
  vec3 q = abs(p) - b;
  float d = length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
  return Surface(d, color, reflectance);
}


Surface minSurface(Surface a, Surface b) {
  if (a.distance < b.distance) {
     return a;
  }
  return b;
}

Surface maxSurface(Surface a, Surface b) {
  if (a.distance > b.distance) {
     return a;
  }
  return b;
}


float floorHeight(vec3 p) {
  return 0.1 * sin(3.0 * length(p.xz - vec2(0.0, -3.0)) + time);
}

Surface sdFloor(vec3 p, vec3 color) {
  float tile = mod(floor(p.x) + floor(p.z), 2.0);
  vec3 reflectance = vec3(0.);
  return Surface(p.y - floorHeight(p), (0.5 + 0.5 * tile) * color, vec3(1. - tile));
}

Surface sdCubere(vec3 p, vec3 offset) {
  return maxSurface(
      sdSphere(p, 0.9, offset, vec3(0.7, 0.5, 0.4), vec3(.95)),
      sdCube(p, 0.7, offset, vec3(1.0, 0.3, 0.4), vec3(0.)));
}

Surface sdScene(vec3 p) {
  vec3 off = vec3(1.0 + 0.5 * cos(time), 1.0, 1.0 + 0.5 * sin(time));
  vec3 pMod = vec3(mod(p.x, 4.0), mod(p.y, 2.0), mod(p.z, 8.0));
  float tile = mod(floor(p.x) + floor(p.z), 2.0);
  Surface ball = sdSphere(pMod, 0.4, off, vec3(0.5), tile * vec3(0.8, 0.8, 0.8));

  /* vec3 off2 = vec3(1.2 * -sin(time), 0., -cos(time) - 2.0); */
  /* off2.y = 0.7 + floorHeight(off2); */
  /* Surface cubere = sdCubere(p, off2); */

  /* Surface floor = sdFloor(p, vec3(0.5)); */
  return ball; // minSurface(minSurface(ball, cubere), floor);
}

Surface rayMarch(Ray ray, float start, float end) {
  float depth = start;
  Surface co;

  for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
    vec3 p = ray.origin + depth * ray.direction;
    co = sdScene(p);
    depth += co.distance;
    if (co.distance < PRECISION || depth > end) break;
  }
  
  co.distance = depth;
  return co;
}

vec3 calcNormal(vec3 p)
{
  float d = sdScene(p).distance; //very close to 0
 
  vec2 e = vec2(.01, 0.0);
 
  vec3 n = vec3
  (
       d - sdScene(p - e.xyy).distance,
       d - sdScene(p - e.yxy).distance,
       d - sdScene(p - e.yyx).distance
  );
 
  return normalize(n);
}

const vec3 AMBIENT = vec3(0.05, 0.05, 0.1);

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;

  vec3 lightPosition = vec3(-8, 4.0, 0);
  vec3 backgroundColor = vec3(0.835, 1, 1);

  vec3 color = vec3(0);
  Ray camera = Ray(vec3(0, 1.0, 3), normalize(vec3(uv, -1)));

  Ray ray = camera;
  Surface obj;
  vec3 attentuation = vec3(1.0);

  for(int i=0; i<5; i++) {
    obj = rayMarch(ray, MIN_DIST, MAX_DIST);

    if (obj.distance > MAX_DIST) {
      // ray didn't hit anything
      color += attentuation * backgroundColor;
      attentuation = vec3(0.0);
    } else {
      vec3 point = ray.origin + ray.direction * obj.distance;
      vec3 normal = calcNormal(point);
      vec3 lightDirection = normalize(lightPosition - point);

      ray = Ray(point, reflect(ray.direction, normal));

      /* Surface source = rayMarch(Ray(point, lightDirection), MIN_DIST, MAX_DIST); */
      /* if (source.distance > MAX_DIST) { */
      float diffuse = clamp(dot(normal, lightDirection), 0.3, 1.);
      /* } else { */
      /*   diffuse = 0.; */
      /* } */

      color += attentuation * (vec3(1.) - obj.reflectance) * (diffuse + AMBIENT) * obj.color;
      attentuation *= obj.reflectance;
    }
  }

  gl_FragColor = vec4(color, 1.);
}
