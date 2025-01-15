---
title: How to Paste the Correct Material
date: 2024/04/21
author: at_0111
---

# How to Paste the Correct Material

適当なオブジェクトにアーマチュアをペアレントしてアニメーションしてみる。

![?width=640&height=480](/post/note/blender/post-HowToPasteTheCorrectMaterial/0001.gif '')

何か違う…何か違くない？

色々と調べた結果、マテリアルノードのテクスチャ座標で変わるっぽい。

> ## Outputs
>
> ### Generated
>
> Automatically-generated texture coordinates from the vertex positions of the mesh without deformation, keeping them sticking to the surface under animation. Range from 0.0 to 1.0 over the bounding box of the undeformed mesh.
>
> ### Object
>
> Uses an object as a source for coordinates. Often used with an empty, this is an easy way to place a small image at a given point on the object. This object can also be animated, to move a texture around or through a surface.

[Texture Coordinate — Blender Manual](https://docs.blender.org/manual/ja/2.90/render/shader_nodes/input/texture_coordinate.html)

繋ぎ直してみる。

![?width=640&height=480](/post/note/blender/post-HowToPasteTheCorrectMaterial/0002.png '')
![?width=640&height=480](/post/note/blender/post-HowToPasteTheCorrectMaterial/0003.png '')

こうなった。

![?width=640&height=480](/post/note/blender/post-HowToPasteTheCorrectMaterial/0004.gif '')

これもう分かんねぇな。

どうやら、プロパティ → データ → テクスチャ空間でバウンディングボックスを正しく設定する必要があるらしい。

> ## Texture Space
>
> ### Auto Texture Space
>
> Adjusts the active object's texture space automatically when transforming the object.

[UVs & Texture Space — Blender Manual](https://docs.blender.org/manual/ja/2.90/modeling/meshes/uv/uv_texture_spaces.html#properties-texture-space)

![?width=640&height=480](/post/note/blender/post-HowToPasteTheCorrectMaterial/0005.png '')
![?width=640&height=480](/post/note/blender/post-HowToPasteTheCorrectMaterial/0006.png '')

オブジェクトのスケールが1.0の場合、サイズを0.5にすればオブジェクト（テクスチャ座標）で出力したマテリアルと同じ大きさになる。

![?width=640&height=480](/post/note/blender/post-HowToPasteTheCorrectMaterial/0007.gif '')

やったぜ。
