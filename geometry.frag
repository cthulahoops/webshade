#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
precision mediump int;

uniform vec2 resolution;

const int MAX_MARCHING_STEPS = 255;
const int MAX_REFLECTION_STEPS = 3;
const float PRECISION = 0.0001;
const float MIN_DIST = 0.0005;
const float MAX_DIST = 50.0;

const vec3 BACKGROUND_COLOR = vec3(0.4, 0.72, 0.86);

const vec3 CAMERA = vec3(0, 1.0, 2.);
const vec3 LIGHT_POSITION = vec3(-8, 4.0, 2);
const vec3 AMBIENT_LIGHT = vec3(0.18, 0.18, 0.2);

struct Surface {
  float distance;
  vec3 color;
  vec3 reflectance;
};

struct Ray {
  vec3 origin;
  vec3 direction;
};

float differenceSDF(float a, float b) {
  return max(a, -b);
}

float intersectionSDF(float a, float b) {
    return max(a, b);
}

float unionSDF(float a, float b) {
    return min(a, b);
}

float sminSDF(float a, float b)
{
  float k = 32.0;
  float res = exp(-k*a) + exp(-k*b);
  return -log(max(0.0001,res)) / k;
}

float sdSphere(vec3 p, float r, vec3 offset)
{
  return length(p - offset) - r;
}

float sdCube(vec3 p, float b, vec3 offset) {
  p = p - offset;
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)), 0.0);
}

float sdCuboid(vec3 p, vec3 b, vec3 offset) {
  p = p - offset;
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)), 0.0);
}


float sdCylinder(vec3 p, float r, float h, vec3 offset) {
  return max(length(p.xz - offset.xz) - r, sdCuboid(p, vec3(r, h, r), offset));
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

float sdPawn(vec3 p, float r, vec3 offset) {
  float a = sdCone(p, 0.2, 1.1, offset);
  float b = sdSphere(p, 0.15, offset + vec3(0., 0.78, 0.));
  return sminSDF(a, b);
}

float sdMirror(vec3 p, vec3 offset) {
  return differenceSDF(
    sdCube(p, 1., offset),
    sdSphere(p, 1.15, offset + vec3(0., 0., 1.7))
  );
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
  return 0.0;
}

Surface sdFloor(vec3 p, vec3 color) {
  float tile = mod(floor(p.x) + floor(p.z), 2.0);
  vec3 reflectance = vec3(0.);
  return Surface(p.y - floorHeight(p), (0.5 + 0.5 * tile) * color, tile * vec3(0.8));
}

vec3 onFloor(vec3 p) {
  return vec3(p.x, floorHeight(p) + p.y, p.z);
}

Surface sdScene(vec3 p) {
  Surface cube = Surface(sdCube(p, 1.0, vec3(2.0, 1.0, -2.0)), vec3(1.,0.2,0.2), vec3(0.0));

  Surface cylinder = Surface(sdCylinder(p, 0.4, 0.7, vec3(-2.0, 0.7, -2.0)), vec3(0.,1.,0.), vec3(0.2));

  Surface cone = Surface(sdCone(p, 0.5, 0.8, vec3(-1., 0.0, -1.)), vec3(0.9,0.3,0.9), vec3(0.1));
  Surface floor = sdFloor(p, vec3(0.5));

  Surface pawn = Surface(sdPawn(p, 2., vec3(0.0, 0.0, -1.3)), vec3(0.8), vec3(0.2));

  Surface mirror = Surface(sdMirror(p, vec3(0.0,1.0, -3.)), vec3(0.,0.,0.), vec3(0.8));

  Surface scene;

  scene = minSurface(floor, cube);
  scene = minSurface(cylinder, scene);
  scene = minSurface(cone, scene);
  scene = minSurface(pawn, scene);
  scene = minSurface(mirror, scene);
  return scene;
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


  vec3 color = vec3(0);
  Ray camera = Ray(CAMERA, normalize(vec3(uv, -1)));

  Ray ray = camera;
  Surface obj;
  vec3 attentuation = vec3(1.0);

  for(int i=0; i<MAX_REFLECTION_STEPS; i++) {
    obj = rayMarch(ray, MIN_DIST, MAX_DIST);

    if (obj.distance > MAX_DIST) {
      // ray didn't hit anything
      color += attentuation * BACKGROUND_COLOR;
      attentuation = vec3(0.0);
    } else {
      vec3 point = ray.origin + ray.direction * obj.distance;
      vec3 normal = calcNormal(point);
      vec3 lightDirection = normalize(LIGHT_POSITION - point);

      ray = Ray(point, reflect(ray.direction, normal));

      Surface source = rayMarch(Ray(point, lightDirection), MIN_DIST, MAX_DIST);
      float diffuse;
      if (source.distance > MAX_DIST) {
        diffuse = clamp(dot(normal, lightDirection), 0.3, 1.);
      } else {
        diffuse = 0.;
      }

      color += attentuation * (vec3(1.) - obj.reflectance) * (diffuse + AMBIENT_LIGHT) * obj.color;
      attentuation *= obj.reflectance;
    }
  }

  gl_FragColor = vec4(color, 1.);
}
