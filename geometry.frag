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
const int MAX_REFLECTION_STEPS = 5;
const float PRECISION = 0.0001;
const float MIN_DIST = 0.0005;
const float MAX_DIST = 50.0;

const vec3 BACKGROUND_COLOR = vec3(0.4, 0.72, 0.86);

const vec3 CAMERA = vec3(0, 1, 2);
/* const vec3 LIGHT_POSITION = vec3(-8, 4.0, 2); */
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

float difference_sdf(float a, float b) {
  return max(a, -b);
}

float intersection_sdf(float a, float b) {
    return max(a, b);
}

float union_sdf(float a, float b) {
    return min(a, b);
}

float smin_sdf(float a, float b)
{
  float k = 32.0;
  float res = exp(-k*a) + exp(-k*b);
  return -log(max(0.0001,res)) / k;
}

float sd_sphere(vec3 p, float r, vec3 offset)
{
  return length(p - offset) - r;
}

float sd_cube(vec3 p, float b, vec3 offset) {
  p = p - offset;
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)), 0.0);
}

float sd_cuboid(vec3 p, vec3 b, vec3 offset) {
  p = p - offset;
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)), 0.0);
}


float sd_cylinder(vec3 p, float r, float h, vec3 offset) {
  return max(length(p.xz - offset.xz) - r, sd_cuboid(p, vec3(r, h, r), offset));
}

float point_distance(vec2 p0, vec2 p1, vec2 p2) {
  float a = (p2.x - p1.x) * (p1.y - p0.y) - (p1.x - p0.x) * (p2.y - p1.y);
  float b = length(p2 - p1);
  return a / b;
}

float sd_cone(vec3 p, float r, float h, vec3 offset) {
  float cube = sd_cuboid(p, vec3(r, h / 2.0, r), offset + vec3(0., h/2., 0.));
  p = p - offset;
  float x = length(p.xz);

  float cone = point_distance(vec2(x, p.y), vec2(r, 0.), vec2(0., h));
  return intersection_sdf(cone, cube);
}

float sd_pawn(vec3 p, float r, vec3 offset) {
  float a = sd_cone(p, 0.2, 1.1, offset);
  float b = sd_sphere(p, 0.15, offset + vec3(0., 0.78, 0.));
  return smin_sdf(a, b);
}

float sd_mirror(vec3 p, vec3 offset) {
  return difference_sdf(
    sd_cube(p, 1., offset),
    sd_sphere(p, 1.15, offset + vec3(0., 0., 1.7))
  );
}

Surface min_surface(Surface a, Surface b) {
  if (a.distance < b.distance) {
     return a;
  }
  return b;
}

Surface max_surface(Surface a, Surface b) {
  if (a.distance > b.distance) {
     return a;
  }
  return b;
}


float floor_height(vec3 p) {
  return 0.0;
}

Surface sd_floor(vec3 p, vec3 color) {
  float tile = mod(floor(p.x) + floor(p.z), 2.0);
  vec3 reflectance = vec3(0.);
  return Surface(p.y - floor_height(p), (0.5 + 0.5 * tile) * color, tile * vec3(0.8));
}

vec3 on_floor(vec3 p) {
  return vec3(p.x, floor_height(p) + p.y, p.z);
}

Surface sd_scene(vec3 p) {
  Surface cube = Surface(sd_cube(p, 1.0, vec3(2.0, 1.0, -2.0)), vec3(1.,0.2,0.2), vec3(0.0));

  Surface cylinder = Surface(sd_cylinder(p, 0.4, 0.7, vec3(-2.0, 0.7, -2.0)), vec3(0.,1.,0.), vec3(0.2));

  Surface cone = Surface(sd_cone(p, 0.5, 0.8, vec3(-1., 0.0, -1.)), vec3(0.9,0.3,0.9), vec3(0.1));
  Surface floor = sd_floor(p, vec3(0.5));

  Surface pawn = Surface(sd_pawn(p, 2., vec3(0.0, 0.0, -1.3)), vec3(0.8), vec3(0.2));

  Surface mirror = Surface(sd_mirror(p, vec3(0.0,1.0, -3.)), vec3(0.,0.,0.), vec3(0.8));

  Surface ball = Surface(sd_sphere(p, 0.2, vec3(1., 0.2, -0.5)), vec3(0.0,0.0,1.0), vec3(0.));

  Surface scene;

  scene = min_surface(floor, cube);
  scene = min_surface(ball, scene);
  scene = min_surface(cylinder, scene);
  scene = min_surface(cone, scene);
  scene = min_surface(scene, pawn);
  scene = min_surface(mirror, scene);
  return scene;
}

Surface ray_march(Ray ray, float start, float end) {
  float depth = start;
  Surface closest_object;

  for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
    vec3 point = ray.origin + depth * ray.direction;
    closest_object = sd_scene(point);
    depth += closest_object.distance;
    if (closest_object.distance < PRECISION || depth > end) break;
  }
  
  closest_object.distance = depth;
  return closest_object;
}

vec3 calc_normal(vec3 p)
{
  float d = sd_scene(p).distance; //very close to 0
 
  vec2 e = vec2(.01, 0.0);
 
  vec3 n = vec3
  (
       d - sd_scene(p - e.xyy).distance,
       d - sd_scene(p - e.yxy).distance,
       d - sd_scene(p - e.yyx).distance
  );
 
  return normalize(n);
}

vec3 specular(Ray ray, vec3 normal, vec3 light_direction) {
    float specular_strength = 0.8;
    vec3 specular_color = vec3(1., 1., 1.);
    vec3 reflect_dir = reflect(-light_direction, normal);
    float spec = pow(max(dot(-ray.direction, reflect_dir), 0.0), 32.);
    return specular_strength * spec * specular_color;
}

vec3 pixel_color(vec2 uv) {
  vec3 color = vec3(0);
  Ray camera = Ray(CAMERA, normalize(vec3(uv, -1)));

  Ray ray = camera;
  Surface obj;
  vec3 attentuation = vec3(1.0);

  for(int i=0; i<MAX_REFLECTION_STEPS; i++) {
    obj = ray_march(ray, MIN_DIST, MAX_DIST);

    if (obj.distance > MAX_DIST) {
      // ray didn't hit anything
      color += attentuation * BACKGROUND_COLOR;
      break;
    } else {
      vec3 point = ray.origin + ray.direction * obj.distance;
      vec3 normal = calc_normal(point);
      vec3 LIGHT_POSITION = 10.0 * vec3(8.0 * cos(0.4 * time), 3, -8.0 * sin(0.4 * time));
      vec3 light_direction = normalize(LIGHT_POSITION - point);

      vec3 spec = specular(ray, normal, light_direction);

      // Comput shadows:
      Surface source = ray_march(Ray(point, light_direction), MIN_DIST, MAX_DIST);
      float shadow = float(source.distance > MAX_DIST);

      float diffuse = clamp(dot(normal, light_direction), 0.0, 1.);


      //vec3 albedo = 0.5 * (vec3(1.) - obj.reflectance) * (shadow * diffuse + AMBIENT_LIGHT) * obj.color ;// + specular(ray, normal, light_direction);

      vec3 albedo = (shadow * diffuse + AMBIENT_LIGHT) * obj.color + spec * shadow;

      color += attentuation * albedo;

      ray = Ray(point, reflect(ray.direction, normal));
      attentuation *= obj.reflectance;
    }
  }
  return color;
}

vec2 get_uv(vec4 fragCoord) {
  return (fragCoord.xy - 0.5 * resolution.xy) / resolution.y;
}
void main() {
  vec3 color = pixel_color(get_uv(gl_FragCoord));

  gl_FragColor = vec4(color, 1);
}
