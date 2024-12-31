---
title: Three.js 3D Scene Optimization Techniques
description: Three.js is a popular 3D library for creating web-based 3D scenes. Here are some common optimization techniques to help you improve the performance of your Three.js scenes.
slug: threejs002
date: 2024-12-27
image: threejs002-cover.jpg
categories:
    - 3D
    - threejs
tags:
    - threejs
weight: 1       # You can add weight to some posts to override the default sorting (date descending)
---
If you're encountering performance bottlenecks while creating 3D scenes with Three.js, don't worry! Here are some common optimization techniques to help you improve your scene's performance.
## Model Optimization
### 1. Merge Geometries
A common model optimization technique is to merge multiple geometries into a single geometry. This reduces the number of rendering calls, thus improving performance. You can use the `BufferGeometryUtils.mergeBufferGeometries` method from the `BufferGeometryUtils` library to merge geometries.
```javascript
import { BufferGeometryUtils } from 'three';
const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries([geometry1, geometry2, geometry3]);
```
### 2. Reduce Geometry Face Count
Another common model optimization technique is to reduce the number of faces in a geometry. You can use 3D modeling software or the `SimplifyModifier` in Three.js to reduce the face count of a geometry.
```javascript
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier';
const modifier = new SimplifyModifier();
const simplifiedGeometry = modifier.modify(geometry, 0.5); // 50% of the face count
```
## Code Optimization
### 1. Use WebGL Rendering Mode
By default, Three.js uses WebGL rendering mode to render scenes. However, sometimes you might accidentally use the Canvas rendering mode. Ensure your code uses WebGL rendering mode to effectively improve performance.
```javascript
const renderer = new THREE.WebGLRenderer();
```
### 2. Batch Rendering
Batch rendering is a technique of rendering multiple objects together, reducing the number of rendering calls. You can use `InstancedMesh` to implement batch rendering.
```javascript
import { InstancedMesh } from 'three';
const mesh = new InstancedMesh(geometry, material, count);
```
### 3. Use LOD (Level of Detail)
Using LOD allows you to select different levels of model detail based on the distance of the object in the scene. You can use the `LOD` object to implement LOD functionality.
```javascript
import { LOD } from 'three';
const lod = new LOD();
lod.addLevel(mesh1, distance1);
lod.addLevel(mesh2, distance2);
```
### 4. **Blurry Rendering Optimization - Pixel Ratio**
> The ratio of the width to height of a single pixel in an image, while the aspect ratio of a frame refers to the ratio of the width to height of an image frame.
> 
> Get the screen pixel ratio in JavaScript: `window.devicePixeRatio`
> 
```javascript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```
### 5. **Screen Adaptation**
```javascript
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => {
    // Update canvas size
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // Update camera parameters
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    // Update rendering size
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
```
### 6. **Common Canvas Style Optimization**
- Remove border and outline from Three.js canvas
```css
* {
    margin: 0;
    padding: 0;
}
.webgl canvas {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
}
```
- Remove any scrolling
```css
html, body {
    overflow: hidden;
}
```
### 7. **Fullscreen Handling**
```javascript
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
});
```
## Conclusion
These are some common optimization techniques for Three.js. Of course, this article only introduces some basic techniques, and you can further improve scene performance through other methods. I hope this article helps you optimize your Three.js scenes better!
