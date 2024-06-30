---
layout: default
title: Code
nav_exclude: true
---

## fragement_coordinates.frag

```glsl
#ifdef GL_ES
precision mediump float;
#endif

// Incoming data from the environment
uniform vec2 u_resolution;
uniform float u_time;




void main()
{
    // Coordinate transformation to map the incoming fragment
    // coordinates to a normalized system
    vec2 p = gl_FragCoord.xy;

    // Both axis run from 0..1 with
    // the origin
    //p /= u_resolution.xy;

    // We want a coordinate system that runs
    // from -1..1 in y with the 0,0 
    // in the middle of the screen
    // The range from x depends on the range
    // of y

    p *= 2.0;
    p -= u_resolution.xy;
    p /= u_resolution.y;
    // For running between -0.5..0.5
    // p *= 0.5;

    // Putting all together
    // p = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;


    // gl_FragColor = vec4(vec3(p.x), 1.0);
    // gl_FragColor = vec4(vec3(abs(p.x)), 1.0);
    // gl_FragColor = vec4(vec3(abs(p.y)), 1.0);
    gl_FragColor = vec4(vec3(abs(p.x)) * vec3(abs(p.y)), 1.0);
}
```
