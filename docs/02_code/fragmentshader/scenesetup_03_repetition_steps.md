---
layout: default
title: 404
nav_exclude: true
---


# Repetition Examples - Steps

* [Repetition Examples - Steps](#repetition-examples---steps)
    * [Step 1 - Repetition](#step-1---repetition)
    * [Step 2 - Add Fog](#step-2---add-fog)
    * [Step 5 - Gamma](#step-5---gamma)
    * [Step 5 - Animate The Camera](#step-5---animate-the-camera)
    * [Step 2 - Offset](#step-2---offset)



## Step 1 - Repetition

* Take out the plane



```glsl
    // Repetition
    point_on_ray = fract(point_on_ray) - .5;

    ...

    distance_to_scene = sdfSphere(point_on_ray, 0.15);
```

* Don't forget to reduce the sphere's radius to actually see the sphere (otherwise they overlap)
* As we will have only one element, the sphere in the scene, we can simplify the sdfScene to:

```glsl
float sdfScene(vec3 point_on_ray) 
{
    // Coordinate transformation
    point_on_ray = fract(point_on_ray) - .5;

    float distance_to_scene = sdfSphere(point_on_ray, 0.15);

    return distance_to_scene;
}
```


Further suggestions

* Turn off shadows
* Stop animation of light
* Turn up ambient light, e.g. to `vec3(0.3)`



## Step 2 - Add Fog

```glsl
#define FAR 30.
```

```glsl
    float fog = smoothstep(0., .95, distance_to_scene/FAR);
    // Applying the background fog 
    color = mix(color, vec3(0.8), fog); 
```

## Step 5 - Gamma

```glsl
    // Gamma correction
    color = pow(color, vec3(.4545)); 
```

Normally, you would start with having this color modification in the scene to build the lighting and materials accordingly.




## Step 5 - Animate The Camera

```glsl
uniform float u_time;


    // Moving "into" the scene
    vec3 ray_origin = vec3(0, 0, u_time*1.5);
```

```glsl
    float val_cos = cos(u_time * .25);
    float val_sin = sin(u_time * .25);

    // Rotate around z
    ray_direction.xy = mat2(val_cos, val_sin, -val_sin, val_cos) * ray_direction.xy;
    // Rotate around y
    ray_direction.xz = mat2(val_cos, val_sin, -val_sin, val_cos) * ray_direction.xz;
```




## Step 2 - Offset

This is completely up to personal taste.

* Create a 3D random vector:

```glsl
    // Create a random 3D vector for 
    // offsetting the position
    // The random 3D vector generation is 
    // based on the point coordinate
    float n = sin(dot(floor(point_on_ray), vec3(27, 113, 57)));
    vec3 rnd = fract( vec3(2097152, 262144, 32768) * n) * .16 - .08;
```

* Add that vector to the position on ray

```glsl
    point_on_ray = fract(point_on_ray + rnd) - .5;
    distance_to_scene = sdfSphere(point_on_ray, 0.15);
```
