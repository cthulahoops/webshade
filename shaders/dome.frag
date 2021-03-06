#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
precision mediump int;

uniform vec2 resolution;
uniform float time;
uniform vec3 camera_position;
uniform vec2 camera_rotation;

const int MAX_MARCHING_STEPS = 255;
const int MAX_REFLECTION_STEPS = 5;
const float PRECISION = 0.0001;
const float MIN_DIST = 0.0005;
const float MAX_DIST = 50.0;

const vec3 BACKGROUND_COLOR = vec3(0.1, 0.05, 0.02);

const vec3 AMBIENT_LIGHT =  1.0 * vec3(0.18, 0.18, 0.2);

struct Material {
  vec3 color;
  vec3 reflectance;
  vec3 emitance;
};

struct Surface {
  float distance;
  Material material;
};

struct Ray {
  vec3 origin;
  vec3 direction;
};

struct Light {
  vec3 position;
  vec3 color;
};

const Light LIGHT1 = Light( vec3(1.2, 5.1, -0.5), vec3(1) );
const Light LIGHT2 = Light( vec3(-1.2, 3.8, -0.5), vec3(1) );

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

float sd_dome(vec3 p) {
  return -sd_sphere(p, 5., vec3(0));

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
  return Surface(p.y - floor_height(p), Material((0.5 + 0.5 * tile) * color, tile * vec3(0.1), vec3(0)));
}

vec3 on_floor(vec3 p) {
  return vec3(p.x, floor_height(p) + p.y, p.z);
}

Surface sd_scene(vec3 p) {
  Surface cube = Surface(
      sd_cube(p, 1.0, vec3(2.0, 1.0, -2.0)),
      Material(vec3(1.,0.2,0.2), vec3(0.0), vec3(0)));

  Surface white_cube = Surface(
      sd_cube(p, 1.0, vec3(2.0, 1.0, 0.0)),
      Material(vec3(1,1.,1), vec3(0), vec3(0)));
  
  Surface cylinder = Surface(
      sd_cylinder(p, 0.4, 0.7, vec3(-2.0, 0.7, -2.0)),
      Material(vec3(0,1.,0), vec3(0.2), vec3(0)));

  Surface cone = Surface(
      sd_cone(p, 0.5, 0.8, vec3(-1., 0.0, -1.)),
      Material(vec3(0.9,0.3,0.9), vec3(0.1), vec3(0)));

  Surface floor = sd_floor(p, vec3(0.5));

  Surface mirror = Surface(
      sd_mirror(p, vec3(0.0,1.0, -3.)),
      Material(vec3(0.,0.,0.), vec3(0.8), vec3(0)));

  Surface light1 = Surface(
      sd_sphere(p, 0.05, LIGHT1.position),
      Material(vec3(0), vec3(0.), LIGHT1.color));

  Surface light2 = Surface(
      sd_sphere(p, 0.05, LIGHT2.position),
      Material(vec3(0), vec3(0.), LIGHT2.color));

  Surface dome = Surface(
      sd_dome(p),
      Material(vec3(0), 1.-step(mod(p.y, 1.), 0.04) * vec3(0.6), vec3(0))
  );
  Surface scene;

  scene = min_surface(floor, cube);
  scene = min_surface(white_cube, scene);
  scene = min_surface(dome, scene);
  scene = min_surface(light1, scene);
  scene = min_surface(light2, scene);
  scene = min_surface(cylinder, scene);
  scene = min_surface(cone, scene);
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

vec3 specular(Ray ray, vec3 normal, vec3 light_direction, vec3 color) {
    float specular_strength = 0.3;
    vec3 specular_color = vec3(1., 1., 1.);
    vec3 reflect_dir = reflect(-light_direction, normal);
    float spec = pow(max(dot(-ray.direction, reflect_dir), 0.0), 87.);
    return specular_strength * spec * color;
}

vec3 compute_light(vec3 light_direction, vec3 point) {
  Surface source = ray_march(Ray(point, light_direction), MIN_DIST, MAX_DIST);
  if (source.distance > MAX_DIST) {
    return vec3(1);
  } else {
    return source.material.emitance;
  }
}

vec3 rotateY(vec3 point, float theta) {
  return (mat4(cos(theta), 0, -sin(theta), 0,
            0, 1, 0, 0,
            sin(theta), 0, cos(theta), 0,
            0, 0, 0, 1) * vec4(point, 1.0)).xyz;
}

vec3 rotateX(vec3 point, float theta) {
  return (mat4(
            1, 0, 0, 0,
            0, cos(theta), -sin(theta), 0,
            0, sin(theta), cos(theta), 0,
            0, 0, 0, 1) * vec4(point, 1.0)).xyz;
}

vec3 pixel_color(vec2 uv) {
  vec3 color = vec3(0);
  Ray camera = Ray(camera_position, rotateY(rotateX(normalize(vec3(uv, -1)), camera_rotation.x), -camera_rotation.y));

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

      vec3 light = vec3(0);
      vec3 spec;
      vec3 diffuse;

      vec3 light_direction;

      light_direction = normalize(LIGHT1.position - point);
      light = compute_light(light_direction, point);
      spec += light * specular(ray, normal, light_direction, LIGHT1.color);
      diffuse += LIGHT1.color * light * clamp(dot(normal, light_direction), 0.0, 1.);

      light_direction = normalize(LIGHT2.position - point);
      light = compute_light(light_direction, point);
      spec += light * specular(ray, normal, light_direction, LIGHT2.color);
      diffuse += LIGHT2.color * light * clamp(dot(normal, light_direction), 0.0, 1.);

      vec3 albedo = (diffuse + AMBIENT_LIGHT) * obj.material.color + spec;

      color += attentuation * max(albedo, obj.material.emitance);

      ray = Ray(point, reflect(ray.direction, normal));
      attentuation *= obj.material.reflectance;
    }
  }
  return color;
}

vec2 get_uv(vec4 fragCoord) {
  return (fragCoord.xy - 0.5 * resolution.xy) / resolution.y;
}

vec3 gamma_correction(vec3 color, float gamma) {
  return pow(color, vec3(1./gamma));
}

void main() {
  vec3 color = pixel_color(get_uv(gl_FragCoord));
  gl_FragColor = vec4(gamma_correction(color, 0.8), 1);
}
