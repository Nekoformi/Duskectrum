---
title: Set Automatic Execution Bash Script
date: 2024/02
author: Nekoformi
---

# Set Automatic Execution Bash Script

Bashには特定の状況で実行されるファイルが存在します。大抵はユーザー単位で用意されています。

| 場所 | ファイル名 | 機能
| --- | --- | --- |
| ~/ | .bash_profile | 実行するコマンドを記述します：ログイン時に。 |
| ~/ | .bash_logout | 実行するコマンドを記述します：ログアウト時に。 |
| ~/ | .bashrc | 実行するコマンドを記述します：Bashの起動時に。 |

## .bash_profile

環境変数を設定する際に便利なファイルです。例えば、`echo`コマンドと追記リダイレクション（`>>`）を用いて`~/My Path`にPATHを通す操作をファイルに追記してみましょう。

```sh:Bash
$ sudo echo "export PATH=\$PATH:~/\"My Path\"" >> ~/.bash_profile
```

- 定義された変数（シェル変数）はターミナル（シェル）を閉じると消えてしまうため、恒久的に変数を定義したい場合は`export`コマンドで環境変数に設定します。
- 変数は`変数名=内容`で定義して`$変数名`で呼出しますが、PATHは既に内容が定義されているため、上書きではなく書き足す操作として`PATH=$PATH:内容`を定義します。これは、PATHが複数の内容をコロン（`:`）で区切るためです。
- 文字列に空白（` `）が含まれる場合は空白をエスケープ（`\ `）するか、引用符（`"`）で囲む必要があります。また、変数として機能しないドル記号や引用符の内部で引用符を記述する場合も同様にエスケープ（`\$`や`\"`）する必要があります。

当然ながら他のファイルを呼び出すことも可能なので、可読性や保守性を高めるために個別のファイルを用意しても構いません。

```sh:Bash
$ sudo echo "bash ~/\"My Command\"/\"Run at Login.sh\"" >> ~/.bash_profile
```

```sh:~/My Command/Run at Login.sh
[](/data/page/note/bash/post-SetAutomaticExecutionBashScript/runAtLogin.sh)
```

- Bashのコマンドをファイルに記述する際は、1行目にシバン・シェバング（`#!/bin/bash`）を書くことで機能を明示します。

## .bash_logout

私はコマンドやアクティビティーの履歴を残したくないので、ここで削除を行います。ファイルを削除する場合は`rm`コマンドを、ファイルの中身を削除する場合は`/dev/null`（虚無）を対象にリダイレクション（`>`）します。

```sh:Bash
$ sudo echo "bash ~/\"My Command\"/\"Run at Logout.sh\"" >> ~/.bash_logout
```

```sh:~/My Command/Run at Logout.sh
[](/data/page/note/bash/post-SetAutomaticExecutionBashScript/runAtLogout.sh)
```

- <var>Disable Some History</var>は[KDE](https://kde.org/)のアクティビティーを操作する内容であるため、他のデスクトップ環境を使用している場合は専用のコードを記述する必要があります。

## .bashrc

エイリアス（コマンドの略称）を設定する際に便利なファイルです。例えば、長いコマンドを頻繁に入力する場合は`alias 略称="コマンド"`を設定することで`略称`から元の`コマンド`を実行できます。他にも、プロンプト（コマンドの入力箇所に表示される情報）の変更やターミナルの改造が行えます。

```sh:Bash
$ sudo echo -e "\nsource ~/\"My Command\"/\"Run at Bash Start.sh\"" >> ~/.bashrc
```

```sh:~/My Command/Run at Bash Start.sh
[](/data/page/note/bash/post-SetAutomaticExecutionBashScript/runAtBashStart.sh)
```

- `.bashrc`には何かしらのコードが既に記述されている場合が多く、既存の内容と区別するために`\n`で空行を追加します。
- `echo`コマンドでは`-e`オプションを付与することでエスケープシーケンス（改行を表す`\n`等）を解釈します。
- `.bashrc`以外のファイルにエイリアスを記述する場合は、`bash`コマンドではなく`source`コマンドを使用して実行元の環境（`.bashrc`、つまりターミナル）にコマンドを展開する必要があります。
- `\e[XX;XXm文字列\e[XX;XXm`はANSIエスケープシーケンス、`\[文字列\]`は制御シーケンスを記述するための特殊文字です。
- `PS1`という変数に文字列を記述することで、プロンプトを変更します。
- `PROMPT_COMMAND`という変数にコマンドや関数を記述することで、コマンドの処理が終了した後（＝プロンプトが表示される前）に内容を自動で実行します。
