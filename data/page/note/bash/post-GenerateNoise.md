---
title: Generate Noise
date: 2024/07/18
author: Nekoformi
---

# Generate Noise

手軽に乱数を生成したい場合は、ウェブサイトやソフトウェアではなく基本的な機能に頼るのも良いかもしれません。

```sh:/usr/local/bin/generateNoise
[](/data/page/note/bash/post-GenerateNoise/generateNoise.sh)
```

- Bashのコマンドをファイルに記述する際は、1行目にシバン・シェバング（`#!/bin/bash`）を書くことで機能を明示します。
- スクリプトは汎用性を考慮してPATHが通る場所に設置することが推奨されます。

スクリプトを実行すると、以下の結果となります。

```sh:Bash
$ generateNoise @hex 32 10
589adbd414b1096ac42e956c8c50ee15
1b9982ec295dd8c5f0414df46b5a6f8a
c98e9ff217317f08c8497a78a77e8982
744a66292e3c39e26681e189c7ca877d
ccbfd0d18fe585f9175866958ba1857d
f7066edac871b8d69766c12825cc0cce
f1c1f012412ee66d435a4fcb4f92e216
efbfa350d8a4c6f834610dba5bfa01b4
4beb0c208d3c172f121901b650f2b045
d5f4d5964c3031fd3d69e219e329bdbe
```
