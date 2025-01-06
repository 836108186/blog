---
title: 基于Vite构建的Three.js 3D 场景通用模板 
description: Three.js 3D 场景通用模板
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
## 使用 Vite 和 Three.js 构建 3D Web 应用

之前的文章我们分享了Threejs 的基本构成，需要有场景（scense）、相机（Camera）、对象（Objects）、渲染器（renderers），本篇文章将会基于这四个基本构成来创建一个基础的threejs渲染 

[Three.js：你的3D世界](https://betterthantomorrow.top/zh-cn/p/threejs001/)

### 项目结构

首先，让我们看一下项目的结构，该项目由以下文件和文件夹组成：

```
index.html       // 项目的 HTML 主入口
js/
  app.js         // 包含 Three.js 代码的主 JS 文件
package.json     // 项目的依赖和脚本配置
vite.config.js   // Vite 的配置文件
```

### 配置文件

### `index.html`

这是项目的入口 HTML 文件，包含了基本的 HTML 结构和一个引用 `js/app.js` 的 `<script>` 标签。
threejs 需要容器来渲染，所以在index.html中我们创建了一个div容器，id为container

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
这是项目的 JavaScript 文件，我们将在这里编写 Three.js 代码。同时也会在这里创建 Three.js 场景、相机和渲染器，并添加一些基本的几何体。


```javascript
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


export default class Sketch{
    constructor(options){
        this.container = options.dom;
        this.scene = new THREE.Scene();

        // 获取容器的宽高
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({
            alpha: true // 透明背景
        });
        // 设置渲染器的大小
        this.renderer.setSize(this.width, this.height);
        this.container.appendChild(this.renderer.domElement);

        // 创建相机
        this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 10);
        // 设置相机的位置与视点
        this.camera.position.z = 1;
        // 创建控制器
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        
        // 添加物体
        this.addObjects();

        // 监听窗口大小变化
        this.setupResize()

        // 渲染
        this.render();
    }

    setupResize(){
        
        window.addEventListener('resize', this.resize.bind(this));
    }

    resize(){
        // 获取容器的宽高，设置渲染器的大小，设置相机的宽高比，更新相机的投影矩阵

        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;

        this.camera.updateProjectionMatrix();
    }

    addObjects(){
        // 创建一个平面
        this.geometry = new THREE.PlaneGeometry(1,1,50,50);
        // 创建一个材质
        this.material = new THREE.MeshNormalMaterial();

        // 在场景中添加一个网格，网格是物体的容器，将几何体和材质传入网格中
        this.scene.add(new THREE.Mesh(this.geometry, this.material));
    }

    render(){
        this.renderer.render(this.scene, this.camera);

    }
}

new Sketch({
    // 将需要渲染的容器传入到构造函数中
    dom: document.getElementById('container')
})
```

### `package.json`

这是项目的配置文件，定义了项目的依赖项和脚本。

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

这是 Vite 的配置文件，配置了 Vite 插件。

```
import { defineConfig } from 'vite';

export default defineConfig({});

```
### 运行项目

1. 安装依赖：

```bash
npm install
```

2. 启动开发服务器：

```bash
npm run dev
```

3. 构建生产版本：

```bash
npm run build
```

4. 预览生产版本：

```bash
npm run serve
```


### 效果预览

![image.png](threejs003-1.jpg)

### 结论

[完整代码链接](https://pub-4babffd0710542e691e21c4d52e9c78d.r2.dev/BlogResourceFile/LinkResource/threejs003/threejsBaseTemplate-vite.zip)

通过上面步骤，我们就完成了一个基础模板构建，方便后续优化和插件应用。希望这篇博文对您有所帮助！



