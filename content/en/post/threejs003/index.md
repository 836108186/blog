---
title: Universal Template for Three.js 3D Scenes Built with Vite
description: A universal Three.js project template built with Vite
keywords: ["Three.js", "3D", "WebGL", "JavaScript","template"]
slug: threejs003
date: 2025-01-06
image: threejs003-cover.jpg
categories:
    - 3D
    - threejs
    - template
tags:
    - threejs
weight: 1       # You can add weight to some posts to override the default sorting (date descending)
---

In our previous article, we shared the basic components of Three.js, which include scene, camera, objects, and renderer. In this article, we will create a basic Three.js rendering based on these four components.


[Three.js:Your Gateway to 3D Worlds](https://betterthantomorrow.top/p/threejs001/)

### Project Structure

First，let's take a look at the project structure, which consists of the following files and folders：

```
index.html       // Project's main HTML entry
js/
  app.js         // Main JS file containing Three.js code
package.json     // Project's dependencies and scripts configuration
vite.config.js   // Vite configuration file
```

### Configuration Files

### `index.html`

This is the main HTML file of the project, which contains the basic HTML structure and a `<script>` tag that references `js/app.js`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            background-color: #ccc;
        }
        * {
            margin: 0;
            padding: 0;
        }
        #container {
            width: 100%;
            height: 100vh;
        }
    </style>
</head>
<body>
    <div id="container"></div>
    <script src="js/app.js" type="module"></script>
</body>
</html>

```
### `app.js`

This is the project's JavaScript file, where we will write Three.js code. We will create Three.js scenes, cameras, and renderers here, and add some basic geometries.


```javascript
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


export default class Sketch{
    constructor(options){
        this.container = options.dom;
        this.scene = new THREE.Scene();

        // Get the width and height of the container
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        // Create a renderer
        this.renderer = new THREE.WebGLRenderer({
            alpha: true // Transparent background
        });
        // Set the size of the renderer
        this.renderer.setSize(this.width, this.height);
        this.container.appendChild(this.renderer.domElement);

        // Create a camera
        this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 10);
        // Set the position and viewpoint of the camera
        this.camera.position.z = 1;
        // Add orbit controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        
        // Add objects
        this.addObjects();

        // Listen for window resize
        this.setupResize()

        // Render the scene
        this.render();
    }

    setupResize(){
        
        window.addEventListener('resize', this.resize.bind(this));
    }

    resize(){
        // Get the width and height of the container, set the size of the renderer, set the aspect ratio of the camera, update the camera's projection matrix

        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;

        this.camera.updateProjectionMatrix();
    }

    addObjects(){
        // Create a plane
        this.geometry = new THREE.PlaneGeometry(1,1,50,50);
        // Create a material
        this.material = new THREE.MeshNormalMaterial();

        // Add a mesh to the scene, which is a container for objects, and pass the geometry and material into the mesh
        this.scene.add(new THREE.Mesh(this.geometry, this.material));
    }

    render(){
        this.renderer.render(this.scene, this.camera);

    }
}

new Sketch({
    // Pass the container element to the Sketch class
    dom: document.getElementById('container')
})
```

### `package.json`

This is the project's configuration file, which defines the project's dependencies and scripts.


```json
{
  "type": "module",
  "name": "threejs-template",
  "version": "1.0.0",
  "description": "A Three.js template project using Vite",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "three": "^0.150.1"
  },
  "devDependencies": {
    "vite": "^4.0.0"
  }
}


```

### `vite.config.js`

This is the Vite configuration file, which configures Vite plugins.

```
import { defineConfig } from 'vite';

export default defineConfig({});

```
### Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build the production version:

```bash
npm run build
```

4. Preview the production version:

```bash
npm run serve
```


### Project Preview

![image.png](threejs003-1.jpg)

### Conclusion
[Download the full code](https://pub-4babffd0710542e691e21c4d52e9c78d.r2.dev/BlogResourceFile/LinkResource/threejs003/threejsBaseTemplate-vite.zip)

By following the above steps, we have completed the construction of a basic template, which is convenient for subsequent optimization and plugin application. I hope this article is helpful to you!





