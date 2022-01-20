#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
precision mediump int;

const vec2 iResolution = vec2(640, 480);
uniform float time;


const int MAX_MARCHING_STEPS = 255;
const float MIN_DIST = 0.0;
const float MAX_DIST = 100.0;
const float PRECISION = 0.001;

struct Surface {
  float distance;
  vec3 color;
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
  return 0.4 * sin(length(p.xz - vec2(0., 3.)) - 1.3 * time) + 0.05 * sin(3.0 * length(p.xz - vec2(7., 3.)) + time)- 1.0;
}

Surface sdFloor(vec3 p, vec3 color) {
  return Surface(p.y - floorHeight(p), (0.5 + 0.5 * mod(floor(p.x) + floor(p.z), 2.0)) * vec3(0.8,0.8,1.0));
}

Surface sdScene(vec3 p) {
  vec3 off1 = vec3(1.2 * sin(time), 0., cos(time) - 2.0);
  off1.y = 1.0 + floorHeight(off1);
  vec3 off2 = vec3(1.2 * -sin(time), 0., -cos(time) - 2.0);
  off2.y = 0.7 + floorHeight(off2);
  Surface left = sdSphere(p, 1., off1, vec3(0.7, 0.2, 0.8));
  Surface right = maxSurface(
      sdSphere(p, 0.9, off2, vec3(0.7, 0.5, 0.4)),
      sdCube(p, 0.7, off2, vec3(0.4, 0.5, 0.4)));
  return minSurface(minSurface(left, right), sdFloor(p, vec3(0.5, 0.5, 0.5)));
}

Surface rayMarch(vec3 ro, vec3 rd, float start, float end) {
  float depth = start;
  Surface co;

  for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
    vec3 p = ro + depth * rd;
    co = sdScene(p);
    depth += co.distance;
    if (co.distance < PRECISION || depth > end) break;
  }
  
  co.distance = depth;
  return co;
}

vec3 calcNormal(in vec3 p) {
    vec2 e = vec2(1.0, -1.0) * 0.0005; // epsilon
    return normalize(
      e.xyy * sdScene(p + e.xyy).distance +
      e.yyx * sdScene(p + e.yyx).distance +
      e.yxy * sdScene(p + e.yxy).distance +
      e.xxx * sdScene(p + e.xxx).distance);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;

  vec3 backgroundColor = vec3(0.835, 1, 1);

  vec3 col = vec3(0);
  vec3 ro = vec3(0, 0, 3); // ray origin that represents camera position
  vec3 rd = normalize(vec3(uv, -1)); // ray direction

  Surface obj = rayMarch(ro, rd, MIN_DIST, MAX_DIST); // distance to sphere

  if (obj.distance > MAX_DIST) {
    col = backgroundColor; // ray didn't hit anything
  } else {
    vec3 p = ro + rd * obj.distance; // point on sphere we discovered from ray marching
    vec3 normal = calcNormal(p);
    vec3 lightPosition = vec3(2, 2, 7);
    vec3 lightDirection = normalize(lightPosition - p);

    // Calculate diffuse reflection by taking the dot product of 
    // the normal and the light direction.
    float dif = clamp(dot(normal, lightDirection), 0.3, 1.);

    // Multiply the diffuse reflection value by an orange color and add a bit
    // of the background color to the sphere to blend it more with the background.
    col = 0.7 * dif * obj.color + backgroundColor * .1;
    // col = obj.color;
  }

  // Output to screen
  gl_FragColor = vec4(col, 1.0);
}
