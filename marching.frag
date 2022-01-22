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
};

struct Ray {
  vec3 origin;
  vec3 direction;
};

Surface sdSphere(vec3 p, float r, vec3 offset, vec3 color)
{
  return Surface(length(p - offset) - r, color);
}

Surface sdCube(vec3 p, float b, vec3 offset, vec3 color) {
  p = p - offset;
  vec3 q = abs(p) - b;
  float d = length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
  return Surface(d, color);
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
  return Surface(p.y - floorHeight(p), (0.5 + 0.5 * mod(floor(p.x) + floor(p.z), 2.0)) * color);
}

Surface sdScene(vec3 p) {
  vec3 off1 = vec3(1.2 * sin(time), 0., cos(time) - 2.0);
  off1.y = 1.0 + floorHeight(off1);
  vec3 off2 = vec3(1.2 * -sin(time), 0., -cos(time) - 2.0);
  off2.y = 0.7 + floorHeight(off2);
  Surface left = sdSphere(p, 1., off1, vec3(0.8, 0.8, 0.4));
  Surface right = maxSurface(
      sdSphere(p, 0.9, off2, vec3(0.7, 0.5, 0.4)),
      sdCube(p, 0.7, off2, vec3(0.4, 0.5, 0.4)));
  return minSurface(minSurface(left, right), sdFloor(p, vec3(0.5, 1.0, 1.0)));
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

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;

  vec3 lightPosition = vec3(-8, 4.0, 0);
  vec3 backgroundColor = vec3(0.835, 1, 1);

  vec3 color = vec3(0);
  Ray camera = Ray(vec3(0, 1.0, 3), normalize(vec3(uv, -1)));

  Ray ray = camera;
  Surface obj;
  for(int i=0; i<5; i++) {
    obj = rayMarch(ray, MIN_DIST, MAX_DIST);

    if (obj.distance > MAX_DIST) {
      // ray didn't hit anything
      color = backgroundColor;
    } else {
      vec3 point = ray.origin + ray.direction * obj.distance;
      vec3 normal = calcNormal(point);
      vec3 lightDirection = normalize(lightPosition - point);

      ray = Ray(point, reflect(ray.direction, normal));

      float diffuse = clamp(dot(normal, lightDirection), 0.3, 1.);
      color = 0.7 * diffuse * obj.color + backgroundColor * .1;
    }
  }

  // Output to screen
  gl_FragColor = vec4(color, 1.);
}
