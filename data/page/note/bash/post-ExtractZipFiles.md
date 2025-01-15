---
title: Extract Zip Files
date: 2024/02
author: Nekoformi
---

# Extract Zip Files

GUIでは複数の圧縮ファイルを一括で展開するとき、全てをサブフォルダー付きで展開することができません。その問題を解決するために、簡易的なスクリプトを作成しました。

```sh:/usr/local/bin/extractZipFiles
[](/data/page/note/bash/post-ExtractZipFiles/extractZipFiles.sh)
```

- Bashのコマンドをファイルに記述する際は、1行目にシバン・シェバング（`#!/bin/bash`）を書くことで機能を明示します。
- 文字列に空白（` `）が含まれる場合は空白をエスケープ（`\ `）するか、引用符（`"`）で囲む必要があります。また、引用符の内部で引用符を記述する場合も同様にエスケープ（`\"`）する必要があります。
- 変数展開とパターンマッチ（`${変数名(#|##|%|%%)パターン}`）を用いることでディレクトリーの抽出やパスの正規化を行います。
- `7z`コマンドで展開したデータをパイプ（`|`）で再び`7z`コマンドに渡すことで、また、その際に`-so`オプションと`-si`オプションを用いることで二重に圧縮されたファイル（`.tar.gz`等）を展開します。
- 定義された関数（シェル関数）は`xargs`コマンドで呼び出せないため、`export`コマンドと`-f`オプションで関数を環境変数に設定します。また、`xargs`コマンドでは`bash`コマンドに`-c`オプションを付与することで文字列をコマンドとして実行します。
- `xargs`コマンドは改行や空白を区切りとして処理するため、パスに空白が含まれると正常に動作しません。それを解決するため、`find`コマンドでは`-print0`オプションを付与することで一覧の区切りをNULL文字（`/0`）で記述します。また、`xargs`コマンドでは`-0`オプションを付与することでNULL文字を区切りとして処理します。
- スクリプトは汎用性を考慮してPATHが通る場所に設置することが推奨されます。

スクリプトを実行すると、以下の結果となります。

```~/Test Directory
- Test Folder A.zip
    - Test Folder
        - Test File
- Test Folder B.zip
    - Test Folder
        - Test File
- Test Folder C.zip
    - Test Folder
        - Test File
- Test Folder D.7z
    - Test Folder
        - Test File
- Test Folder E.tar
    - Test Folder
        - Test File
- Test Folder F.tar.gz
    - Test Folder
        - Test File
```

```sh:Bash
$ extractZipFiles ~/"Test Directory" ~/"Extract Directory"
```

```~/Extract Directory
- Test Folder A
    - Test Folder
        - Test File
- Test Folder B
    - Test Folder
        - Test File
- Test Folder C
    - Test Folder
        - Test File
- Test Folder D
    - Test Folder
        - Test File
- Test Folder E
    - Test Folder
        - Test File
- Test Folder F
    - Test Folder
        - Test File
```
