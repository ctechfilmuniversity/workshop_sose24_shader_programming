```glsl
#version 300 es 
precision mediump float;
/*
    Based on work of ?
*/

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

out vec4 fragColor;

// For the sphere tracing
#define STEPS_MAX 50
#define DISTANCE_MAX 50.
#define DISTANCE_MIN .001

// For the normal computation
// (the h from the forumla)
#define EPSILON 0.0001

// Animation
#define SPEED .8


// The heart shape
// from iq https://www.shadertoy.com/view/3tyBzV
float dot2( in vec2 v ) { return dot(v,v); }
float sdfHeart( in vec2 v )
{
    v.x = abs(v.x);

    if( v.y+v.x>1.0 ) return sqrt(dot2(v-vec2(0.25,0.75))) - sqrt(2.0)/4.0;

    return sqrt(min(dot2(v-vec2(0.00,1.00)),
                    dot2(v-0.5*max(v.x+v.y,0.0)))) * sign(v.x-v.y);
}


float sdfScene(vec3 point_on_ray)
{
    // The sdf is actually 2d!
    // The z value adjusts the position
    // of the 2D heart, moving it down
    // creating the animation
    // point_on_ray.y += 0.5 + 6.0*pow(0.13 * abs(point_on_ray.z), 2.7);
    
    // STEPS TO GET TO THE LINE ABOVE
    // 1. Place the heart in the middle:
    // point_on_ray.y += 0.5;

    // 2. Move the heart down y, depending on z
    // (the larger z, to more move y)
    // point_on_ray.y += 0.5 + abs(point_on_ray.z);

    // 3. Scales that movement, make it less extreme
    // point_on_ray.y += 0.5 + 0.13 * abs(point_on_ray.z);

    // 4. Reshape the above placment down y
    // to first change  a lot and then change very slowly 
    // (have a look at the function on graphtoy https://graphtoy.com)
    // point_on_ray.y += 0.5 + pow(0.13 * abs(point_on_ray.z), 2.7);

    // 5. Multiplying the value depending on z (with multiplying 6)
    // makes to function even steeper and it changes faster 
    // at the beginning.
    // The effect is that the going down a tunnel effect is
    // emphazied
    point_on_ray.y += 0.5 + 6.0 * pow(0.13 * abs(point_on_ray.z), 2.7);

    // Sdfs are negativ inside and positive outside
    // We want the opposite here, so that
    // z (for the colors) becomes smaller with
    // increasing distance to the middle
    // Hence * -1:
    return -sdfHeart(point_on_ray.xy);
}



float sphereTracing(vec3 ray_origin, vec3 ray_direction)
{
    float distance_to_scene = 0.;

    for(int i=0; i < STEPS_MAX; i++)
    {
        // We move along the ray 
        // the last distance_to_scene amount
        vec3 point_on_ray = ray_origin + ray_direction * distance_to_scene;

        // Compute the new distance to scene
        // from the just computed point on the 
        // camera ray
        distance_to_scene += sdfScene(point_on_ray);

        // Did we overshoot or have a hit with the scene?
        if(distance_to_scene > DISTANCE_MAX || distance_to_scene < DISTANCE_MIN) break;
    }

    return distance_to_scene;
}



vec3 colorPalette(float z)
{
    // Transform z to be between 0..1
    z = fract(z); // Same as: z = mod(z, 1.0);

    // index between 0..7
    int index = int(floor(z*15.99));

    // For optimization, move this color conversions
    // to main, for it being done only once
    if(index == 0) return vec3(140,34,85)/256.0;
    else if(index == 1) return vec3(214,34,124)/256.0;
    else if(index == 2) return vec3(171,37,49)/256.0;
    else if(index == 3) return vec3(218,63,56)/256.0;
    else if(index == 4) return vec3(223,85,79)/256.0;
    else if(index == 5) return vec3(233,139,49)/256.0;
    else if(index == 6) return vec3(239,168,72)/256.0;
    else if(index == 7) return vec3(244,234,65)/256.0;    
    else if(index == 8) return vec3(131,190,69)/256.0;    
    else if(index == 9) return vec3(61,171,72)/256.0;    
    else if(index == 10) return vec3(22,138,68)/256.0;    
    else if(index == 11) return vec3(45,172,111)/256.0;    
    else if(index == 12) return vec3(29,157,143)/256.0;    
    else if(index == 13) return vec3(57,159,204)/256.0;    
    else if(index == 14) return vec3(41,107,167)/256.0;    
    else if(index == 15) return vec3(40,52,116)/256.0;    
}

void main() 
{
    // Screen coordinates
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
    vec3 color = vec3(1.);

    // Adjusting the speed
    float time = u_time*SPEED;

    // Camera
    vec3 ray_origin = vec3(0, 0, 0);
    vec3 ray_direction = normalize(vec3(p, 1));

    // The Heart
    float distance_to_scene = sphereTracing(ray_origin, ray_direction);
    // fragColor = vec4(vec3(distance_to_scene * 0.4), 1.0);

    vec3 point_on_surface = ray_origin + ray_direction * distance_to_scene;

    // Z has the same value as the 2D heart distance:
    // fragColor = vec4(vec3(point_on_surface.z * 0.5), 1.0);

    color =  colorPalette(time + point_on_surface.z);
    // color =  colorPalette(point_on_surface.z);

    fragColor = vec4(color, 1.0);


    // TESTING THE HEART SHAPE
    // p.y += 0.5;
    // float distance_to_scene = sdfHeart(p);
    // // fragColor = vec4(vec3(distance_to_scene), 1.0);
    // color = (distance_to_scene < 0.0) ? vec3(0.5, 0.0, 0.1) : vec3(0.3, 0.8, 0.9);
    // fragColor = vec4(color, 1.0);


}

```