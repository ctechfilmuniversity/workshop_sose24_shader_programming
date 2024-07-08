name: inverse
layout: true
class: center, middle, inverse
---


# Shader Programming Workshop

#### Prof. Dr. Lena Gieseke | l.gieseke@filmuniversitaet.de  
#### Film University Babelsberg KONRAD WOLF

<br >

## *Overview 3*


<!--
Start server in /doc/

h or ?: Toggle the help window
j: Jump to next slide
k: Jump to previous slide
b: Toggle blackout mode
m: Toggle mirrored mode.
c: Create a clone presentation on a new window
p: Toggle PresenterMode
f: Toggle Fullscreen
t: Reset presentation timer
<number> + <Return>: Jump to slide <number>
-->

---
layout:false

## The Workshop


Technology


* Shader pipeline ✓
* Example three.js ✓
* Fragment shader ✓
* Example Unreal

Scenario

* Rendering a 3D scene in in a fragment shader 

---
layout:false

## The Workshop


Technology


* Shader pipeline ✓
* Example three.js ✓
* Fragment shader ✓
* (Example Unreal) -> Example three.js 

Scenario

* Rendering a 3D scene in in a fragment shader 


---
layout: false

## The Workshop

Rendering a 3D scene in in a fragment shader 

* Implicit Geometry ✓
* Signed Distance Functions ✓
* 3D Scene Rendering ✓
* Sphere Tracing + Implementation Example ✓
* Simple Shading ✓

--

* Simple Shading Implementation Example

--
* Transformations

--
* Constructive Solid Geometry

--
* Further Effects

---
## Re-Cap

.center[<img src="../img/preview_01.png" alt="preview_01" style="width:45%;">]

---
## Preview

.center[<video autoplay loop width="500"><source src="../img/preview_02.webm"type="video/webm"></video>]

???
.task[COMMENT:]  


.center[<img src="../img/preview_03.png" alt="preview_03" style="width:66%;">]

---
## Preview

.center[<video autoplay loop width="500"><source src="../img/preview_04.webm"type="video/webm"></video>]


???
.task[COMMENT:]  

* Show three.js example

.center[<video autoplay loop width="500"><source src="../img/preview_05.webm"type="video/webm"></video>]

---
layout: false

## Last Time...

* Signed Distance Functions

???
.task[COMMENT:]  

* What was the general idea?
* SDF: An implicit equation returns the (squared) distance of any point in three-dimensional space to the surface of the object.
* Analytically defined geometry, meaning a **function** or equations define the geometry.

* We can mathematically combine and manipulate implicit surfaces in all sort of ways to create shapes.
* The most basic assembly methods are with *boolean operators*

--
* Sphere Tracing

???
.task[COMMENT:]  

* What was the general idea?
* Rendering -> Shoot a ray through each fragment into the scene. Detect the surface a ray hits and use the surface color for the fragment.
* Sphere Tracing
    * We shoot from a point of view ("camera") a ray through the fragment into the scene
    * We go step by step along the view ray in order to find the surface it hits
        * For taking a step along the ray, we compute the distances to all objects in the scene
        * From those distances we take the smallest one as step size
        * We decide on an intersection once the step size is below a threshold
    * (We take the color of the hit surface point as fragment color - we will come back to this)
* This algorithm is called *sphere tracing* because when you compute the smallest distance from a point to all surfaces, this distance can be seen as the radius of a sphere within which we can move freely without ever intersecting with a surface. 

--
    * It is usually just called ***ray marching***
--
    * In different flavors in almost all fragement shaders with a 3D look
--
    * Computing the minimal distance to all surfaces in a scene is often called `map()` (in our examples this is `sdfScene()`)
--
* Computation of the normal of a surface point with gradients

--
* Diffuse Reflection

???
.task[COMMENT:]  

* How could a basic phenomenal model look like?

--
    * $max(L ∙ N, 0)$
???
.task[COMMENT:]  

* We need to decrease in the intensity of the light by a factor of ${cosθ}$
* The value of ${cosθ}$ is given by the **dot product** between the normal vector $N$ and the unit direction to the light source $L$. 
* We clamp the dot product to zero in our illumination calculations. 

--
* Ambient Light

???
.task[COMMENT:]  

* For simple shading we usually add a constant color to mimic ambient light.


Shadows  
* Compute the distance from the point to the light
* Compute the distance from the point to the scene surfaces along the point-light-ray
* If the distance to the scene is smaller than the distance to the light then there is an object between surface point and light, and we need to add shadow to the shading of the point.

---
## Sphere Tracing

--

```glsl
void main()
{
    ...

    vec3 ray_origin = vec3(0, 0.1, -2);

    vec3 ray_direction = normalize(vec3(p, 1.));

    float distance_to_scene = sphereTracing(ray_origin, ray_direction);

    ...
}
```

---
## Sphere Tracing


```glsl
void main()
{
    ...

    // Camera position
    vec3 ray_origin = vec3(0, 0.1, -2);

    // Camera direction
    // Shooting a ray "through" the current fragment
    vec3 ray_direction = normalize(vec3(p, 1.));

    float distance_to_scene = sphereTracing(ray_origin, ray_direction);

    ...
}
```

---
## Sphere Tracing

```glsl
float sphereTracing(vec3 ray_origin, vec3 ray_direction)
{
    float distance_to_scene = 0.;

    for(int i=0; i < STEPS_MAX; i++)
    {
        vec3 point_on_ray = ray_origin + ray_direction * distance_to_scene;

        distance_to_scene += sdfScene(point_on_ray);

        if(distance_to_scene > DISTANCE_MAX || 
           distance_to_scene < DISTANCE_MIN) break;
    }

    return distance_to_scene;
}
```

---
## Sphere Tracing

```glsl
float sphereTracing(vec3 ray_origin, vec3 ray_direction)
{
    float distance_to_scene = 0.;

    for(int i=0; i < STEPS_MAX; i++)
    {
        // We move along the ray 
        // the last distance_to_scene amount
        vec3 point_on_ray = ray_origin + ray_direction * distance_to_scene;

        // Compute the new distance to scene
        // from the just computed point on the camera ray
        distance_to_scene += sdfScene(point_on_ray);

        // Did we overshoot or have a hit with the scene?
        if(distance_to_scene > DISTANCE_MAX || 
           distance_to_scene < DISTANCE_MIN) break;
    }
    return distance_to_scene;
}
```

---
template:inverse

# Implementing Diffuse Shading

---
## Diffuse Shading

* Start with file `spheretracing_01_no_shading.frag`
* The code to be added can be found in `spheretracing_02_diffuse_shading_steps.md`



???
.task[COMMENT:]  


## Diffuse Shading

```glsl
void main()
{
    ...

    vec3 point_on_surface = ray_origin + ray_direction * distance_to_scene;

    color = getDiffuseShading(point_on_surface);

    fragColor = vec4(color, 1.0);
}
```


```glsl
vec3 getDiffuseShading(vec3 point_on_surface)
{
    ...

    return vec3((color_material * reflection_diffuse * shading_shadow) 
                 + color_ambient);
}
```


## Lights

```glsl
vec3 getDiffuseShading(vec3 point_on_surface)
{
    // Light position
    vec3 light_position = vec3(2, 8, 0);

    // Light direction
    vec3 light_direction_to_point = normalize(light_position - point_on_surface);

    ...

```



## Normals

```glsl
    // Normal of the surface
    vec3 surface_normal = estimateNormal(point_on_surface);
}
```



## Normals

```glsl
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
```


## Normals

```glsl
vec3 estimateNormal(vec3 p) // p is point_on_surface
{
    //vec3 n = vec3(
    //    sdfScene(vec3(p.x + EPSILON, p.y, p.z)) - sdfScene(vec3(p.x - EPSILON, p.y, p.z)),
    //    sdfScene(vec3(p.x, p.y + EPSILON, p.z)) - sdfScene(vec3(p.x, p.y - EPSILON, p.z)),
    //    sdfScene(vec3(p.x, p.y, p.z  + EPSILON)) - sdfScene(vec3(p.x, p.y, p.z - EPSILON))
    //);

    // The same as above but more elegantly with swiffeling
    const vec2 h = vec2(EPSILON,0);

    vec3 n = vec3(sdfScene(p+h.xyy) - sdfScene(p-h.xyy),
                   sdfScene(p+h.yxy) - sdfScene(p-h.yxy),
                   sdfScene(p+h.yyx) - sdfScene(p-h.yyx));

    return normalize(n);
}
```


## Material and Reflection

```glsl
    vec3 color_material = vec3(0.8, 0.8, 0.8);
    float reflection_diffuse = max(dot(surface_normal, 
                                        light_direction_to_point), 0.);

    vec3 color_ambient = vec3(0.1, 0.1, 0.1);
```



## Material and Reflection

```glsl
    vec3 color_material = vec3(0.8, 0.8, 0.8);
    float reflection_diffuse = max(dot(surface_normal, 
                                        light_direction_to_point), 0.);

    // Ambient Light
    // To lighten up everything a bit
    vec3 color_ambient = vec3(0.1, 0.1, 0.1);
```



## Shadow

```glsl
#define MOVE_POINT .02

...

    vec3 point_moved_up = vec3 (point_on_surface + surface_normal * MOVE_POINT);

    float distance_to_scene_light_direction = 
                        sphereTracing(point_moved_up, light_direction_to_point);

    float shading_shadow = 1.;
    if(distance_to_scene_light_direction < length(light_position-point_on_surface)) 
    {
        shading_shadow *= .1;
    }
```


## Shadow

```glsl
#define MOVE_POINT .02

...

    vec3 point_moved_up = vec3 (point_on_surface + surface_normal * MOVE_POINT);

    float distance_to_scene_light_direction = 
                        sphereTracing(point_moved_up, light_direction_to_point);

    // If the distance to the scene is smaller than the distance to the light
    // then there is an object between surface point and light, and
    // with that the surface point is in the shadow
    float shading_shadow = 1.;
    if(distance_to_scene_light_direction < length(light_position-point_on_surface)) 
    {
        // This factor reduces the light
        shading_shadow *= .1;
    }
```



```glsl
vec3 getDiffuseShading(vec3 point_on_surface)
{
    ...

    return vec3((color_material * reflection_diffuse * shading_shadow) 
                 + color_ambient);
}
```



* https://www.shadertoy.com/view/Xds3zN
    * https://iquilezles.org/articles/rmshadows/
* https://www.shadertoy.com/view/ltyXD3 (commented)
* https://www.shadertoy.com/view/WsSBzh


/Users/legie/Documents/filmuni/03_teaching/class/shader_programming/workshop_shader_programming/docs/code/spheretracing_07_diffuse_shading.frag

---
template: inverse

#### The End

# 🤓


