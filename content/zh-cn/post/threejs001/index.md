---
title: Three.js：你的3D世界
description: Three.js 是一个 3D JavaScript 库，它可以帮助你为网络创造3D体验，而且非常容易使用。如果你想让你的网站更加炫酷，那么 Three.js 一定是你的好帮手。
slug: threejs001
date: 2024-12-27
image: cover.png
categories:
    - 3D
    - three.js
tags:
    - three.js
weight: 1       # You can add weight to some posts to override the default sorting (date descending)
---

## **什么是 Three.js？**

Three.js 是一个 3D JavaScript 库，它可以帮助你为网络创造3D体验，而且非常容易使用。如果你想让你的网站更加炫酷，那么 Three.js 一定是你的好帮手。

Three.js 是一个在 MIT 许可下的 JavaScript 库，它在 WebGL 之上运行。这个库的目标就是简化处理3D内容的过程。只需要几行代码，你就可以获得一个动画3D场景，而且你无需了解复杂的着色器和矩阵。

## **什么是 WebGL？**

WebGL 是一种 JavaScript API，它可以在画布中呈现三角形，而且速度非常快，因为它使用访问者的图形处理单元 (GPU)。GPU 可以进行数千次并行计算，这让我们可以在3D场景中进行复杂的运算。然而，尽管 WebGL 在处理3D场景方面非常出色，但仍然有一些缺点。例如，如果你想要创建一个复杂的场景，你需要掌握一些高级技巧，这可能对于初学者来说非常困难。此外，WebGL 也需要高性能的硬件来运行，因为它需要大量的计算资源。因此，如果你的计算机性能不足，那么使用 WebGL 可能会导致你的应用程序运行缓慢或崩溃。

原生 WebGL 非常困难，因为你需要手动写很多代码。但是 Three.js 消除了这个障碍，让你可以轻松创建3D场景。除了 Three.js 之外，还有其他一些工具可以帮助您更轻松地创建3D场景，例如 Babylon.js 和 A-Frame。这些工具提供了各种各样的功能，从简单的场景到复杂的虚拟现实体验。因此，如果您想要创建一个3D应用程序，您可以考虑使用这些工具来简化开发流程。

## **Three.js 的运行需要4个条件**

- 场景 (scenes)
- 渲染器 (renderers)
- 相机 (cameras)
- 对象 (objects)

## **什么是场景？**

在 Three.js 中，场景是一个非常重要的概念。它类似于一个容器或者说世界，可以包含各种对象、模型、粒子和灯光等。场景是 Three.js 中的一个核心组件，它是构建一个 3D 场景所必需的。通过将不同的对象添加到场景中，我们可以创建一个复杂的 3D 环境，从而实现更加生动、吸引人的 3D 体验。

## **什么是渲染器？**

渲染器是一个非常重要的组件，它的工作是将我们的代码与设计渲染到我们的web中。在threejs中，我们通常使用 [WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer) 类来进行渲染。WebGL是一种3D绘图标准，它允许我们在web上呈现复杂的3D图形，而不需要插件，这是非常棒的。 WebGLRenderer的一个伟大之处在于它提供了丰富的功能，例如对材质、灯光、阴影和反射的支持。这使得我们能够创建出更加逼真的场景和模型，从而提高用户体验。总之，渲染器是任何三维场景的重要组成部分，也是threejs中不可或缺的组件。

## **什么是对象？**

在 Three.js 中，所有的元素都是对象，包括几何体、模型、粒子和灯光等。这些对象可以应用不同的材质和纹理，并使用相机和光源进行渲染。 Three.js 还提供了许多扩展和库，例如 MeshStandardMaterial 和 dat.gui，可以让你创建更高级的渲染效果和用户界面。

## **什么是相机？**

在 Three.js 中，相机是非常重要的一个元素，用来决定我们观察场景的角度和位置。相机被用来模拟人眼对场景的观察，因此非常重要。在 Three.js 中，创建相机非常简单，我们可以使用 [PerspectiveCamera](https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera) 类来创建。这个类允许我们设置许多参数，例如视角、宽高比、近截面和远截面等等，因此我们可以完全控制相机的行为。

另外，在 Three.js 中，相机本身是不可见的，它仅用于计算和确定场景中物体的位置和角度。因此，我们只能看到相机所观察到的内容，而不能看到相机本身。这意味着，我们需要在场景中加入其他可见的对象，例如物体、灯光等等，才能看到场景。因此，在使用 Three.js 时，不仅需要了解相机的使用，还需要了解如何创建和操作其他类型的对象。

> PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
 fov — 摄像机视锥体垂直视野角度 aspect — 摄像机视锥体长宽比 near — 摄像机视锥体近端面 far — 摄像机视锥体远端面
> 

在Three.js中，我们可以拥有多个相机，但通常情况下只需要一个。

相机在Three.js中类似于一个锥形体，它受到视野范围和纵横比的影响。

**视野范围：**

视野是你的视角有多大。如果你使用一个非常大的角度，你将能够同时看到各个方向，但会失真很多，因为结果将绘制在一个小矩形上。如果使用小角度，则物体看起来会被放大。

![视野范围](threejs001-1.jpeg)

!https://picx.zhimg.com/80/v2-e23347e6f92de84702ded7ce9684da4a_720w.jpeg?source=d16d100b

### **那么如何将渲染到指定的位置呢？**

在这种情况下，我们需要理解笛卡尔坐标系（这个比较难解释，所以这里我们使用图片来解释），通过x，y，z三个坐标轴在三维空间中进行定位。在WebGL与Threejs中使用的是正交右手坐标系：

- 正交右手坐标系：右手拇指代表X轴，食指代表Y轴，中指代表Z轴。
- 手臂和拇指代表Y轴。
- 与地面平行的是Z轴。
- 拇指代表X轴。

!https://picx.zhimg.com/80/v2-9199470f10582861fcddd69714122daa_720w.png?source=d16d100b

**笛卡尔坐标系图示：**

!https://picx.zhimg.com/80/v2-9014d3e39bc706cd29bc41685054ae0d_720w.jpeg?source=d16d100b

## **结尾**

以上就是 Three.js 渲染流程的详细解释。了解这个流程对于理解 Three.js 的工作原理非常重要。如果你想要进一步深入学习 Three.js，我建议你查看官方文档和示例，这里有很多有用的信息和代码片段，可以帮助你更好地理解和使用 Three.js。此外，你也可以尝试创建自己的3D场景和模型，这将帮助你更好地掌握 Three.js 的技术和工作原理。希望这篇文章对你有所帮助，谢谢！