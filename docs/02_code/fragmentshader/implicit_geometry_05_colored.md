---
layout: default
title: Code
nav_exclude: true
---

## implicit_geometry_05_colored.frag

```glsl
#version 300 es 
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 fragColor;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

// return value is positive if point is outside,
// negative if p is inside of the circle
float sdf_circle(vec2 p, float radius)
{
    return length(p) - radius;
}

float smin(float a, float b, float k)
{
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * (1.0 / 4.0);
}

void main()
{
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
    float radius = .3;
    vec3 color = vec3(0.);

    float cells = 4.;

    // Coordinate Transformation
    p *= cells;
    vec2 p_cell_index = floor(p);
    vec2 p_cell = fract(p);
    // fragColor = vec4(p_cell.x, p_cell.y, 0., 1.0);

    float d = 1.;

    for(int y = -1; y <= 1; y++) // -1, 0, 1
    {
        for(int x = -1; x<=1; x++)
        {
            vec2 neighbor = vec2(float(x), float(y));
            
            //get random point
            vec2 point = random2(p_cell_index + neighbor);
            point = vec2(0.5) + 0.5 *(sin(u_time+ 6.2831853 * point));

            float dist = sdf_circle(neighbor + point - p_cell, radius);
            
            // d = min(d, dist);
            d = smin(d, dist, 0.4);
        }
    }

    // fragColor = vec4(vec3(d), 1.);

    // color += step(0.1, d);
    color += smoothstep(0., .5, d);
    // color += smoothstep(0., .3, abs(d * 10.));

    vec3 bg = 0.5 + 0.5 * cos(u_time + p.xyx * 0.4 +vec3(0,2,4));
    fragColor = vec4(bg, 1.);

    color = bg + color;
 
    fragColor = vec4(color, 1.);
}
```