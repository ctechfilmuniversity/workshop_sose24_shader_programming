```glsl
#ifdef GL_ES
precision mediump float;
#endif

/*
    Based on work of one of the great: Shane
    https://www.shadertoy.com/view/4lyGzR
*/

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// For the sphere tracing
#define STEPS_MAX 50
#define DISTANCE_MAX 50.
#define DISTANCE_MIN .001

// For the normal computation
// (the h from the forumla)
#define EPSILON 0.0001

// For the fog
#define FAR 30.


// Smooth maximum, based on IQ's smooth minimum function.
float smaxP(float a, float b, float s)
{
    float h = clamp( 0.5 + 0.5*(a-b)/s, 0., 1.);
    return mix(b, a, h) + h*(1.0-h)*s;
}


float sdfScene(vec3 point_on_ray)
{

    // A gyroid lattice as biological tubes 
    // Somehow based on https://plus.maths.org/content/meet-gyroid
    // There is also this tutorial: https://www.youtube.com/watch?v=-adHIyjIYgk 
    // (not sure how related the tutorial is to this solution though)
    const float PI = 3.14159;
    float tubes = dot(cos(point_on_ray*1.5707963), sin(point_on_ray.yzx*1.5707963)) + 1.;
    
    // Making the tubes irregular and pulse
    float biotubes = tubes + .25 + dot(sin(point_on_ray*1. + u_time*PI*2. + sin(point_on_ray.yzx*.5)), vec3(.033));

    // From Shane:
    // The tunnel. Created with a bit of trial and error. 
    // The smooth maximum against the gyroid rounds it off a bit. 
    // The abs term at the end just adds some variation via the beveled edges. 
    float tunnel = smaxP(3.25 - length(point_on_ray.xy - vec2(0, 1)) 
                            + .5*cos(point_on_ray.z*PI/32.), 
                            .75 - tubes, 1.) - abs(1.5-tubes)*.375;

    // return biotubes;
    return min(tunnel, biotubes); 
    
}



float sphereTracing(vec3 ray_origin, vec3 ray_direction)
{
    float distance_to_scene = 0.;
    float point_on_ray_next = 0.;

    float t = 0.0, h;
    for(int i=0; i < STEPS_MAX; i++)
    {
        // We move along the ray 
        // the last distance_to_scene amount
        vec3 point_on_ray = ray_origin + ray_direction * point_on_ray_next;

        // Compute the new distance to scene
        // from the just computed point on the 
        // camera ray
        distance_to_scene = sdfScene(point_on_ray);

        // Did we overshoot or have a hit with the scene?
        if(distance_to_scene > DISTANCE_MAX || distance_to_scene < DISTANCE_MIN) break;

        point_on_ray_next +=  distance_to_scene * .5;
    }

    // return min(point_on_ray_next, DISTANCE_MAX);
    return point_on_ray_next;
}


// Computing the normal for
// point p in regard to the 
// surface description of the
// scene.
vec3 estimateNormal(vec3 p) // p is point_on_surface
{
    vec3 n = vec3(
        sdfScene(vec3(p.x + EPSILON, p.y, p.z)) - sdfScene(vec3(p.x - EPSILON, p.y, p.z)),
        sdfScene(vec3(p.x, p.y + EPSILON, p.z)) - sdfScene(vec3(p.x, p.y - EPSILON, p.z)),
        sdfScene(vec3(p.x, p.y, p.z  + EPSILON)) - sdfScene(vec3(p.x, p.y, p.z - EPSILON))
    );

    // The same as above but more 
    // elegantly with swiffeling
    // const vec2 h = vec2(EPSILON,0);
    // vec3 n = vec3(sdfScene(p+h.xyy) - sdfScene(p-h.xyy),
    //               sdfScene(p+h.yxy) - sdfScene(p-h.yxy),
    //               sdfScene(p+h.yyx) - sdfScene(p-h.yyx));

    return normalize(n);
}

void main() 
{
    // Screen coordinates
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;

    // Camera 
    vec3 look_at = vec3(0, 1, u_time*2. + 0.1); 
    // Ray origin (same as camera position)
    vec3 ray_origin = look_at + vec3(0.0, 0.0, -5); 
    vec3 ray_direction = normalize(vec3(p, 1));


    float distance_to_scene = sphereTracing(ray_origin, ray_direction);

    // Initialize the scene color.
    vec3 color = vec3(0.);

    vec3 point_on_surface = ray_origin + ray_direction * distance_to_scene;

    // Simple stylized shading with the normal
    color = estimateNormal(point_on_surface)* 0.5 + 0.5;

    float fog = smoothstep(0., .99, distance_to_scene/FAR);
    color = mix(color, vec3(0.97, 0.97, 0.6), fog); 

    // gamma correction
    color = pow(color, vec3(.4545)); 

    gl_FragColor = vec4(color, 1.0);

}
```