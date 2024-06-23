name: inverse
layout: true
class: center, middle, inverse
---

# Shader Programming Workshop

#### Prof. Dr. Lena Gieseke | l.gieseke@filmuniversitaet.de  
#### Film University Babelsberg KONRAD WOLF

## *Geometry*


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
template:inverse

# Geometry

---
layout:false

## Geometry

.center[<img src="../img/preview_09.png" alt="preview_09" style="width:60%;">]

--

There are several ways of specifying a geometric object in three (or higher) dimensional space!

---
## Geometry

A rough analogy is to think about vector vs. raster graphics:

.center[<img src="../img/vector_raster.png" alt="vector_raster" style="width:80%;">  
[[justcreative]](https://justcreative.com/raster-vs-vector-graphics-ultimate-guide/)]

--

These are different representations for graphics with individual strengths and weaknesses.

---
.header[Geometry]

## Surfaces

More precisely, you call these two families of shapes in computer graphics:

--

* Parametric descriptions
* Implicit  descriptions

--

You can make use of the different descriptions in different contexts.

---
.header[Geometry]

## Polygon Mesh

--

.center[<img src="../img/bunny_01.png" alt="bunny" style="width:40%;"><img src="../img/sphere_mesh_01.png" alt="sphere_mesh_01" style="width:50%;">]

A set of linked vertices.

---
.header[Geometry]

## Polygon Mesh

.center[<img src="../img/bunny_01.png" alt="bunny" style="width:36%;"><img src="../img/raster.png" alt="raster" style="width:36%;">]

---
.header[Geometry]

## Polygon Mesh

<img src="../img/bunny_01.png" alt="bunny" style="width:10%;">

--

The good

--
* Simple definition (points and polygons)

--
* Easily exchangeable between programs

--
* Modern graphics hardware is really good and fast with processing and displaying meshes

--
* Lots of published research and algorithms for meshes

--
* You can associate specific colors with specific points on the mesh

--

The bad

--
* As it is a **discrete** representation, it is potentially not smooth

--
* It is difficult to perform operations on the mesh shape

.footnote[[[Rhinoceros]](https://discourse.mcneel.com/t/mesh-or-surface-understanding-the-difference/75151/3)]



???
.task[COMMENT:]  

* Usually based on a parametric representation, from which it is easy to generate a triangle mesh

---
.header[Geometry]

## Sphere Surface Description

In parametric form as a function of two parameters, θ and ϕ:  

$x = r · cos ϕ · sin θ$  
$y = r · sin ϕ · sin θ$  
$z = r · cos ϕ $

.center[<img src="../img/sphere_parametric_01.png" alt="sphere_parametric_01" style="width:36%;">[[songho]](https://www.songho.ca/opengl/gl_sphere.html)]


???
.task[COMMENT:]  

* theta, phi
* Bezier curves and surfaces are an example of parametric shapes.
* We won't discuss in this lesson the differences between implicit and parametric forms
* How to find a point on the surface of the sphere?
    * You plug in values for θ, ϕ and r and with that you get the position of a point on the sphere. 

--
  
This is *explicit* as you have explicit parameters.  


---
.header[Geometry]

## Implicit Geometry

--

Analytically defined geometry, meaning a **function** or equations define the geometry.

--

.center[<img src="../img/vector_01.png" alt="vector_01" style="width:36%;">]


---
.header[Geometry]

## Implicit Geometry

.center[<img src="../img/implicit_geometry_01.png" alt="implicit_geometry_01" style="width:60%;">[[ntopology]](https://ntopology.com/blog/2019/05/13/implicits-and-fields-for-beginners/)]

--

.center[<img src="../img/vector_raster.png" alt="vector_raster" style="width:50%;">[[justcreative]](https://justcreative.com/raster-vs-vector-graphics-ultimate-guide/)]

--

Working with implicit functions can be understood as a *procedural modelling* technique.


---
.header[Geometry]

## Implicit Geometry

> Instead of placing vertices, we describe shapes with functions.


---
.header[Geometry]

## Implicit Geometry

We have done this before, remember?

--

.left-quarter[<img src="../img/implicit_geometry_02.png" alt="implicit_geometry_02" style="width:110%;">]
.right-quarter[
```GLSL
void main()
{
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution.xy) 
                  / u_resolution.y;

    // distance of current coordinate to center
    float d = distance(p, vec2(0,0));
    gl_FragColor = vec4(vec3(d), 1.0);
}
```
]


???
.task[COMMENT:]  

* Now, we can add a radius variable and decide based on that radius and the distance, wether the currently computed pixel (aka point, aka xy or uv or st) is inside of the circle or not. Points inside the circle will have a distance from the center less than the radius, points on the circle will have distance equal to the radius, and points outside the circle will have distances greater than the radius.

---
.header[Geometry]

## Implicit Surfaces

.left-quarter[<img src="../img/implicit_geometry_03.png" alt="implicit_geometry_03" style="width:110%;">]
.right-quarter[
```GLSL
void main()
{
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution.xy) 
                  / u_resolution.y;

    // distance of current coordinate to center
    float d = distance(p, vec2(0,0));

    // threshold color based on distance
    float radius = 0.8;
    vec3 color = d < radius ? vec3(0.) : vec3(1.0);

    gl_FragColor = vec4(color, 1.0);
}
```
]

???
.task[COMMENT:]  

* Now, we can add a radius variable and decide based on that radius and the distance, wether the currently computed pixel (aka point, aka xy or uv or st) is inside of the circle or not. Points inside the circle will have a distance from the center less than the radius, points on the circle will have distance equal to the radius, and points outside the circle will have distances greater than the radius.


---
.header[Geometry | Implicit Surfaces]

## Sphere Surface Description

> Set the coordinates in relationship to each other in order to describe a shape.
  
  
This is an *implicit* description.

---
.header[Geometry | Implicit Surfaces]

## Sphere Surface Description

Every point on the surface has the same distance, namely the radius, to its center.  

--

$x^2+y^2+z^2 = r^2$


???
.task[COMMENT:]  

* Hence, in implicit form as quadratic function you can describe a sphere at the origin as 

--

Solve it as quadratic function

$x^2+y^2+z^2-r^2 = 0$

--

Setting $r^2$ to a constant will return a sphere with radius $r$:
  
$f(x,y,z) = x^2+y^2+z^2 - r$  

--

```glsl
float sphere(vec3 p, float r)
{
    return length(p) - r;
}
```

---
.header[Geometry | Implicit Surfaces]

## Sphere Surface Description


You can think of an implicit function as a function that represents many surfaces that are sort of laid out as layers.  

--

For a sphere the layer depends on the given $r$:

.left-even[<img src="../img/sdf_sphere_01.png" alt="sdf_sphere_01" style="width:100%;">  [[Inigo Quilez]](https://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm)]  

.right-even[
Centered at the origin:

```glsl
float sphere(vec3 p, float r)
{
    return length(p) - r;
}
```
]



---
.header[Geometry]
## Implicit Surfaces

  
Solving for  

$x^2+y^2+z^2 − r=0$

--

will tell you wether you are **outside**, **inside** or **on** the surface of the sphere. 


???
.task[COMMENT:]  

* How to find a point on the surface of the sphere?
* All an implicit representation says is that points that actually lie on the surface of the sphere, in other words all points making up the surface of the sphere or its isosurface, satisfy this equation.
* The formula results in 0 for a given point, if it is on the surface. 
* (Hence, for *implicit* surfaces the actual surface is not directly defined.)

--

> What the implicit representation computes is also called the ***Signed Distance Function*** of a sphere.

---
.header[Geometry | Implicit Surfaces]

## Signed Distance Function (SDF)

<img src="../img/implicit_geometry_04.png" alt="implicit_geometry_04" style="width:40%;">

--

If the point is 

--
* inside the object, the distance is negative,

--
* outside the surface, the distance will be positive, and

--
* on the surface, the distance is 0.

--

The collection of points that lie exactly on the surface are called an *isosurface*.

---
.header[Geometry | Implicit Surfaces]

## Sphere Surface Description

.left-quarter[<img src="../img/implicit_geometry_03.png" alt="implicit_geometry_03" style="width:110%;">]
.right-quarter[
```GLSL

float sdf_circle(vec2 p, float radius)
{
    return length(p) - radius;
}

void main()
{
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
    
    float radius = 0.2;
    float d = sdf_circle(p, radius);

    vec3 color = d < 0. ? vec3(0.) : vec3(1.);
    fragColor = vec4(color, 1.0);
}
```
]

---
.header[Geometry]
## Implicit Surfaces

Analytically defined geometry, meaning a **function** or equations define the geometry. 

--

The good

--
* Any resolution and scale
* Accurate

--
* Operators to combine shapes

--
* Small memory footprint 

--
* Can be evaluated for any coordinate without context about the neighborhood

--

The bad

--
* The maths involved might be difficult

--
* Topologically limited 

---
.header[Geometry]
## Implicit Geometry

.center[<img src="../img/sdf_01.png" alt="sdf_01" style="width:100%;">[3D Primitives](https://www.shadertoy.com/view/Xds3zN)]

???
.task[COMMENT:]  

* [2D SDF Functions](https://iquilezles.org/articles/distfunctions2d/)
* https://www.shadertoy.com/results?query=tag%3Dsdf


---
template:inverse


# Combining Distance Functions

---
.header[Geometry]

## Combining Distance Functions

You can easily combine functions to create **composite shapes**. 


???
.task[COMMENT:]  

* One of the cool properties of this representation is that you can combine them to create composite shapes. For example, for the union of shapes, we take the minimum values of all computed distance functions:

--

For example, for the union of shapes, we take the minimum values of all computed distance functions.

???
.task[COMMENT:]  

* .task[Go to code]: implicit_geometry_02_combined.frag


---
.header[Geometry]

## Combining Distance Functions



```glsl
...

void main()
{
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
    float radius = 0.2;

    // The circles
    vec2 circle1_center = vec2(.5, 0.);
    vec2 circle2_center = vec2(-0.5, 0.);
    vec2 circle3_center = vec2(sin(u_time) * 0.4, 0.);
    float circle1 = sdf_circle(p - circle1_center, radius);
    float circle2 = sdf_circle(p - circle2_center, radius);
    float circle3 = sdf_circle(p - circle3_center, radius / 1.8);

    // Union of shapes 
    float d = min(circle1, circle2);
    d = min(d, circle3);

    // threshold color based on distance
    vec3 color = d < 0. ? vec3(0.) : vec3(1.);
    fragColor = vec4(color, 1.0);
}
```

---
.header[Geometry]

## Combining Distance Functions

![sdf_01](../img/sdf_01.gif)

---
.header[Geometry]

## Combining Distance Functions

The intersection can be found by taking the max of two distances and multiplying that to the original value.

```glsl
...
    // Intersection
    float d = min(circle1, circle2);
    d *= max(d, circle3);
...
```

![sdf_02](../img/sdf_02.gif)


???
.task[COMMENT:]  

* Aussen: + und - vom kleinen kreis, ergibt wieder +
* Innen: - und - vom kleinen kreis, ergibt - mal - = +
* https://www.shadertoy.com/view/tsdXD4

---
.header[Geometry]

## Combining Distance Functions

At first, I had accidentally put a `+`... with an interesting result:

```glsl
...
    // Intersection
    float d = min(circle1, circle2);
    d += max(d, circle3);
...
```

![sdf_03](../img/sdf_03.gif)

---
.header[Geometry]

## Combining Distance Functions

Smoothing out the intersection of the union of objects with a a [smooth minimum](https://www.iquilezles.org/www/articles/smin/smin.htm).

The gravity of the "blending" can be adjusted by the variable `k` in the function below. 

```glsl
...
    // Smooth Minimum
    float d = min(circle1, circle2);
    d = smin(d, circle3, 0.2);
...
```

--

.left-even[

`k = 0.05`:

![sdf_04](../img/sdf_04.gif)
]
.right-even[

`k = 0.2`:

![sdf_05](../img/sdf_05.gif)
]



[[8]](https://blog.sb1.io/intro-to-2d-signed-distance-functions/)  


???
.task[COMMENT:]  

* Instead of finding a simple union or intersection, you can compute what is called a [smooth minimum](https://www.iquilezles.org/www/articles/smin/smin.htm). Essentially this allows you to take the union of two objects, and smooth out the intersection point. This allows shapes to blend together as they get near each other. 

---
.header[Geometry]

## Combining Distance Functions

Making it interactive (the smaller circle is controlled by the mouse)

![sdf_06](../img/sdf_06.gif)


???
.task[COMMENT:]  

* Don't forget to normalize the mouse position as well!



---
.header[Implicit Surfaces]

## Rectangle Surface Description

--

<img src="../img/sdf_rect_01.png" alt="sdf_rect_01" style="width:40%;">  
[[Inigo Quilez]](https://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm)  

--

Centered at the origin:

```glsl
float sdf_rect(vec2 p, vec2 size)
{
    vec2 d = abs(p) - size;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

```



???
.task[COMMENT:]  

* TASK: Herleitug




---
.header[Geometry]

## Implicit Geometry

> But how to render this in 3D?

--

> We need a "ray hits surface" test...

# 🤔



---
template:inverse

# ✨ 
#### The End





???
.task[COMMENT:]  

* Any ideas for a "ray hits surface" test?
* We can easily test whether the current origin of a ray is inside the shape by computing its signed distance to the isosurface.  
* SDF Gives us information about where the ray's origin is located in space with respect to the surface...
* ...but not where the ray intersects the object (assuming the ray intersects it at all)  
* This gives us some information about where the ray's origin is located in space with respect to the surface but not where the ray intersects the object (assuming the ray intersects it at all).  

---
# Exercise

--
1. Create a 2D scene that is animated and / or interactive. Feel free to look up further [2D SDF Functions](https://iquilezles.org/articles/distfunctions2d/).

--
2. Try to understand scene [`implicit_geometry_05_colored.frag`](https://ctechfilmuniversity.github.io/workshop_shader_programming/code/implicit_geometry_05_colored.html) as much as you can.

