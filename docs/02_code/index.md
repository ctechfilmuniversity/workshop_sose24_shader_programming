---
layout: default
title: Code
nav_order: 3
has_children: false
---

# Code

In this section you find all code examples for the course.

* [Code](#code)
    * [Day 1](#day-1)
        * [Setup](#setup)
        * [Run The Examples](#run-the-examples)
        * [three.js](#threejs)
    * [Day 2](#day-2)
        * [Setup](#setup-1)
        * [Fragment Shader](#fragment-shader)
        * [Implicit Geometry](#implicit-geometry)
        * [Sphere Tracing](#sphere-tracing)
    * [Day 3](#day-3)
        * [Scene Setup](#scene-setup)
        * [Three.js](#threejs-1)


## Day 1

### Setup

For working with the code you need npm (this is the same setup that we have used in CC1). If you don't have the setup anymore, have a look at [slides 13 - 16 of Seesion 07](https://ctechfilmuniversity.github.io/lecture_ws2324_creative_coding_1/03_slides/cc1_ws2324_07_slides.html#44) of CC1. 

### Run The Examples

For running the code examples:

* Unzip the folder
* With a terminal navigate into the folder 
* Install the dependencies with `npm install`
* Start a local server with `npm run dev`

### three.js

1. Wavy Start: [code](./threejs/01_wavy_start/wavy_start_code.zip)
2. Wavy Pipeline: [steps](./threejs/02_wavy_pipeline/wavy_pipeline_steps.md), [code](./threejs/02_wavy_pipeline/wavy_pipeline_code.zip)
3. Wavy Scene: [steps](./threejs/03_wavy/wavy_steps.md), [code](./threejs/03_wavy/wavy_steps_code.zip)

## Day 2
  
### Setup

For working with the code, today we simply use [glsl-canvas](https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas). 

### Fragment Shader
  
1. Coordinate Transformation: [md](./fragmentshader/fragement_coordinates.md), [code](./fragmentshader/fragement_coordinates.frag)

  
### Implicit Geometry
  
1. Circle: [md](./fragmentshader/implicit_geometry_01_circle.md), [code](./fragmentshader/implicit_geometry_01_circle.frag)
2. Circle SDF: [md](./fragmentshader/implicit_geometry_02_circle_sdf.md), [code](./fragmentshader/implicit_geometry_02_circle_sdf.frag)
3. Combinations: [md](./fragmentshader/implicit_geometry_03_combined.md), [code](./fragmentshader/implicit_geometry_03_combined.frag)
4. Interactive: [md](./fragmentshader/implicit_geometry_04_interactive.md), [code](./fragmentshader/implicit_geometry_04_interactive.frag)
5. Colored: [md](./fragmentshader/implicit_geometry_05_colored.md), [code](./fragmentshader/implicit_geometry_05_colored.frag)
  

### Sphere Tracing
  
1. Sphere Tracing Puzzling, no Shading: [pieces](./fragmentshader/spheretracing_01_no_shading_inpieces.md), [code solution](./fragmentshader/spheretracing_01_no_shading.frag)
2. Sphere Tracing with Shading: [steps](./fragmentshader/spheretracing_02_diffuse_shading_steps.md) (start with this [code](./fragmentshader/spheretracing_01_no_shading.frag)), [code solution](./fragmentshader/spheretracing_03_diffuse_shading.frag)
3. Sphere Tracing for Blobs: [md](./fragmentshader/spheretracing_04_diffuse_shading_blobs.md), [code](./fragmentshader/spheretracing_04_diffuse_shading_blobs.frag)


## Day 3
  
### Scene Setup

1. Transformations: [md](./fragmentshader/scenesetup_01_transformations.md), [code](./fragmentshader/scenesetup_01_transformations.frag)
2. Constructive Solid Geometry: [md](./fragmentshader/scenesetup_02_csg.md), [code](./fragmentshader/scenesetup_02_csg.frag)
    *  Super Sampling: [code](./fragmentshader/scenesetup_02_csg_supersampling.frag)
3. Repetition: [steps](./fragmentshader/scenesetup_03_repetition.md), [code solution](./fragmentshader/scenesetup_03_repetition.frag)
4. Heart: [md](./fragmentshader/scenesetup_04_heart.md), [code](./fragmentshader/scenesetup_04_heart.frag)
5. Biomine: [md](./fragmentshader/scenesetup_05_biomine.md), [code](./fragmentshader/scenesetup_05_biomine.frag)

### Three.js

1. Fragment Shader to three.js: [code](./threejs/04_uvs/uvs_code.zip)