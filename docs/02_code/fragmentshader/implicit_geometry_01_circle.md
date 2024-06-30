---
layout: default
title: Code
nav_exclude: true
---

## implicit_geometry_01_circle.frag

```glsl
#version 300 es 
precision mediump float;

uniform vec2 u_resolution;

out vec4 fragColor;

void main()
{
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;

    // distance of current coordinate to center
    float d = distance(p, vec2(0,0));

    // threshold color based on distance
    float radius = 0.8;
    vec3 color = d < radius ? vec3(0.) : vec3(1.0);

    fragColor = vec4(color, 1.0);
}
```