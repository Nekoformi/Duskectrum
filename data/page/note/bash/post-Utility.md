---
title: Utility
date: 2024/02
author: Nekoformi
---

# Utility

Bashを効率的に動かしたり可読性を高めるには、幾つかの機能を関数として纏めるべきでしょう。

## 関数

関数は以下のように記述します。また、ファイルは以下のように実行します。

```sh:~/Some Bash Script A.sh
[](/data/page/note/bash/post-Utility/testFunctionA.sh)
```

```sh:Bash
$ bash ~/"Some Bash Script A.sh"
Hello, John Smith!
```

- Bashのコマンドをファイルに記述する際は、1行目にシバン・シェバング（`#!/bin/bash`）を書くことで機能を明示します。
- 文字列に空白（` `）が含まれる場合は空白をエスケープ（`\ `）するか、引用符（`"`）で囲む必要があります。

他のファイルに記述された関数を使用する場合は、`source`コマンドでスクリプトを呼び出します。ただし、先程の状態では`testFunction "John Smith"`が実行されてしまうので、関数用のファイルには関数だけを記述しましょう。

```sh:~/Some Bash Script B.sh
[](/data/page/note/bash/post-Utility/testFunctionB.sh)
```

```sh:Bash
$ bash ~/"Some Bash Script B.sh"
Hello, Jane Smith!
```

## Install Advanced Packaging Tool, etc.

コンピューターのセットアップでは多くのパッケージをインストールすると思います。それを何度も繰り返す場合は、操作をファイルに纏めたり、その操作すらも関数に纏めます。

```sh:Some Bash Script.sh
[](/data/page/note/bash/post-Utility/aptInstall.sh)
```

```sh:Some Bash Script.sh
#!/bin/bash

aptInstall curl
snapInstall blender --classic
```

## Copy File / Folder / Zip Data

ファイルやフォルダーを複製したり圧縮ファイルを展開する場合、指定されたディレクトリーが存在しなければ成功しません。それを回避するため、自動的にディレクトリーを作成します。

```sh:Some Bash Script.sh
[](/data/page/note/bash/post-Utility/cpFile_Folder_ZipData.sh)
```

```sh:Some Bash Script.sh
#!/bin/bash

cpFile ~/"Test File.txt" ~/"New File/Copy File.txt"
cpFolder ~/"Test Directory" ~/"New Directory/Copy Directory"
cpZipData ~/"Test Data.zip" ~/"New Data/Copy Data"
```

- 変数展開とパターンマッチ（`${変数名(#|##|%|%%)パターン}`）を用いることでパスを正規化します。
- 複製先にファイルやディレクトリーが存在する場合に対象を削除している（＝複製先を置換している）ため、それを望まない場合は関数内の`rm`コマンドを削除する必要があります。

## Create Empty File / Insert New Line

空のファイルを作成する場合は`touch`コマンドが有効ですが、空の文字列をリダイレクション（`>`）して作成することも可能です。

```sh:Some Bash Script.sh
[](/data/page/note/bash/post-Utility/createEmptyFile.sh)
```

```sh:Some Bash Script.sh
#!/bin/bash

sudoCreateEmptyFile /root/joke
```

```sh:Some Bash Script.sh
[](/data/page/note/bash/post-Utility/insertNewLine.sh)
```

```sh:Some Bash Script.sh
#!/bin/bash

sudoInsertNewLine /root/joke "Hello, world!"
```

- 出力をリダイレクションした場合は改行が挿入される（2行になる）ため、`sed`コマンドを用いて1行目の改行を削除したもの（無）をファイルに書き込みます。
- リダイレクションによるファイルの書き込みは`sudo`で行えないため、`tee`コマンドを使用します。また、インターフェースに出力しないよう`1> /dev/null`で結果を虚無に放り込みます。
- `echo`コマンドでは`-e`オプションを付与することでエスケープシーケンス（改行を表す`\n`等）を解釈します。

## Change Permission / Timestamp

権限や更新日時を一括で変更したいですか？　`find`コマンドと`xargs`コマンドを駆使しましょう！

```sh:Some Bash Script.sh
[](/data/page/note/bash/post-Utility/changePermission_Timestamp.sh)
```

```sh:Some Bash Script.sh
#!/bin/bash

changeDefaultPermission ~/"Test Directory A"
changeMasterPermission ~/"Test Directory B"
changeTimestamp ~/"Test Directory C" "1970/01/01 00:00:00"
```

- `xargs`コマンドは改行や空白を区切りとして処理するため、パスに空白が含まれると正常に動作しません。それを解決するため、`find`コマンドでは`-print0`オプションを付与することで一覧の区切りをNULL文字（`/0`）で記述します。また、`xargs`コマンドでは`-0`オプションを付与することでNULL文字を区切りとして処理します。

## Input Data

スクリプトで対話（ユーザーが入力した文字列を変数に出力）する処理は煩雑なので、一行で実現できるように工夫します。

```sh:Some Bash Script.sh
[](/data/page/note/bash/post-Utility/inputData.sh)
```

```sh:Some Bash Script.sh
#!/bin/bash

file=$(inputData "ファイル")
```

- 関数内で変数を定義する場合は基本的に`local`コマンドの使用が推奨されます。
- 関数は返り値として`echo`コマンドの内容を出力するため、インターフェースのみに出力する場合は`echo`コマンドの結果を標準エラー（`1>&2`）で出力する必要があります。

## Select Option

対話では選択肢を入出力する状況も想定されます。エラーやミスを防ぐ手段として機能の共通化は最も効果的です。

```sh:Some Bash Script.sh
[](/data/page/note/bash/post-Utility/selectOption.sh)
```

```sh:Some Bash Script.sh
#!/bin/bash

myOption=(
    "'Option A'"
    "'Option B'"
    "'Option C'"
)

selectOption "${myOption[*]}"

option=$?

if [ $option = 0 ]; then
    exit
fi

case "$option" in
    1 )
        echo "Select Option A";;
    2 )
        echo "Select Option B";;
    3 )
        echo "Select Option C";;
esac
```

- 空白を含む文字列の配列は扱いが難しいため、以下の処理で関数に入力します。
    1. 配列の各値を二重の引用符（`"'文字列'"`）で囲みます。
    2. 関数の引数として配列を入力する際に、配列全体を配列として参照（`array[@]`）せずに文字列として参照（`array[*]`）します。
    3. `eval`コマンドで文字列を評価（内容を展開して配列に変換）します。
    4. 必要に応じて配列全体を配列として参照します。ただし、空白を扱うために変数を引用符で囲みます。
- `\e[XX;XXm文字列\e[XX;XXm`はANSIエスケープシーケンスです。
- 数値の演算を行う場合は`echo $((変数の演算)) >& /dev/null`で出力結果を虚無に放り込みます。
- 関数が`return`で戻り値を出力する場合の制約として、終了ステータス：8ビットの数値（0 - 255）しか出力できないことに注意してください。また、その場合は`$?`で終了ステータスを取得します。

<h2>Confirm Execution</h2>

<p>
    人間は何かしらのミスを犯します。入力した情報を確認してから処理を実行しましょう。
</p>

```sh:Some Bash Script.sh
[](/data/page/note/bash/post-Utility/confirmExecution.sh)
```

```sh:Some Bash Script.sh
#!/bin/bash

confirmExecution

confirm=$?

if [ $confirm = 0 ]; then
    exit
fi

echo "Running..."
```
