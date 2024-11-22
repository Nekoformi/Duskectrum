---
title: Run AquesTalk Pi on x64
date: 2024/04/23
author: Nekoformi
---

# Run AquesTalk Pi on x64

Linux上で「ゆっくり」にメッセージを喋らせたいと思ったのですが、どうも複雑な状況らしいです。

- 所謂「ゆっくりボイス」と呼ばれる音声は、[株式会社アクエスト](https://www.a-quest.com/)が提供する[AquesTalk](https://www.a-quest.com/products/aquestalk.html)というエンジンによって生成できる。
- エンジンは複数の種類があり、[AquesTalk1](https://www.a-quest.com/products/aquestalk_1.html)、[AquesTalk2](https://www.a-quest.com/products/aquestalk_2.html)、[AquesTalk10](https://www.a-quest.com/products/aquestalk10.html)といった製品が公開されている。
    - 解説動画に登場する「ゆっくり霊夢」や「ゆっくり魔理沙」は[AquesTalk1](https://www.a-quest.com/products/aquestalk_1.html)の音声である。
- エンジンはプログラムに組み込むもの（API）であり、基本的に関数を呼び出して使用する。
    - サンプルとして簡単なコードやアプリケーションも用意されている。
    - エンジン単体では動作しないため、ターミナル上で実行するには簡易的なプログラムの作成とビルドが必要になる。
- AquesTalkを使用したアプリケーションとして公式から[AquesTalkPlayer](https://www.a-quest.com/products/aquestalkplayer.html)等が提供されている他、有志によって[棒読みちゃん](https://chi.usamimi.info/Program/Application/BouyomiChan/)や[ゆっくりMovieMaker](https://manjubox.net/ymm4/)等も開発されている。
- 音声を生成するためには[テキスト情報（音声記号列）](https://www.a-quest.com/archive/manual/siyo_onseikigou.pdf)を入力する必要があり、日本語から音声を出力する場合は[言語処理エンジンAqKanji2Koe](https://www.a-quest.com/products/aqkanji2koe.html)という変換器が必要になる。
- エンジンには複数のライセンスがあり、利用方法に応じて購入する必要がある。
    - 詳細は公式ウェブサイトの[音声合成ライセンスの種類・購入](https://www.a-quest.com/licence.html)を参照するように。
    - エンジンが組み込まれているアプリケーションを使用して個人利用に該当しない（例：収益化している）コンテンツを作成・公開する場合は[使用ライセンス](https://store.a-quest.com/categories/618932)を購入する必要がある。
    - プログラムへ組み込むためのエンジンは[開発ライセンス](https://store.a-quest.com/categories/618933)を購入して製品版パッケージ（SDK）を入手する必要がある。
    - 現状ではLinux向けのアプリケーションが存在しないため、評価版を使用するか製品版を購入する必要がある。
    - **評価版は「ナ行、マ行」の音韻が「ヌ」になる。**
        - 「ゆっくりしていってヌッッッ！」
- 公式が提供するアプリケーションの一つに、Raspberry Pi上で動作する[AquesTalk Pi](https://www.a-quest.com/products/aquestalkpi.html)が存在する。
    - 変換器が組み込まれているため、通常言語から音声を生成できる。
    - **非営利の個人利用**であれば無償で使用できる。
    - ARMベースで作成されたプログラムであるため、一般的なパソコン（x64やx86等）では使用できない。
    - [qemu-user-static](https://github.com/multiarch/qemu-user-static)等のエミュレーターを使用すれば、パソコンとプログラムのアーキテクチャーが異なる場合でも動作する。

ということなので、[AquesTalk Pi](https://www.a-quest.com/products/aquestalkpi.html)と[qemu-user-static](https://github.com/multiarch/qemu-user-static)を使用すれば上手く実現できるかもしれません！

## How to Setup

1. [AquesTalk Pi](https://www.a-quest.com/products/aquestalkpi.html)をダウンロード・展開します。
2. AArch64で実行するため、実行モジュール：`AquesTalkPi`を64ビット版に置換します。

```sh:Bash
mkdir bin32
mv AquesTalkPi bin32/AquesTalkPi
cp bin64/AquesTalkPi AquesTalkPi
```

3. [qemu-user-static](https://github.com/multiarch/qemu-user-static)をインストールします。

```sh:Bash
sudo apt -y install qemu-user-static
```

4. 環境変数を設定します。
    - 定義された変数（シェル変数）はターミナル（シェル）を閉じると消えてしまうため、恒久的に変数を定義したい場合はコマンドを`~/.bash_profile`等に記述する必要があります。

```sh:Bash
export QEMU_LD_PREFIX=/usr/aarch64-linux-gnu/
```

## How to Use

1. 引数に喋らせたい文字列を入力して、出力されたデータを`aplay`に渡して再生します。

```sh:Bash
./AquesTalkPi "ゆっくりしていってね！" | aplay
```

2. オプションを指定することでファイルを読み込んだりキャラクターを変えることができます。

```sh:Bash
echo "ゆっくりしていってね！" | ./AquesTalkPi -v f2 -f > export.wav
```

3. 他の機能については`./AquesTalkPi -h`や[ブログ記事](http://blog-yama.a-quest.com/?eid=970157)を参照してください。

## How to Use (Advance 1)

せっかくなので、テキストファイルから行ごとに音声ファイルを生成するスクリプトを作成します。

```sh:/usr/local/bin/generateYukkuriVoice
[](/data/page/note/bash/post-RunAquesTalkPiOnX64/generateYukkuriVoice.sh)
```

- Bashのコマンドをファイルに記述する際は、1行目にシバン・シェバング（`#!/bin/bash`）を書くことで機能を明示します。
- 文字列に空白（` `）が含まれる場合は空白をエスケープ（`\ `）するか、引用符（`"`）で囲む必要があります。また、引用符の内部で引用符を記述する場合も同様にエスケープ（`\"`）する必要があります。
- 変数展開とパターンマッチ（`${変数名(#|##|%|%%)パターン}`）を用いることでディレクトリーの抽出やパスの正規化を行います。
- 定義された関数（シェル関数）は`xargs`コマンドで呼び出せないため、`export`コマンドと`-f`オプションで関数を環境変数に設定します。また、`xargs`コマンドでは`bash`コマンドに`-c`オプションを付与することで文字列をコマンドとして実行します。
- スクリプトは汎用性を考慮してPATHが通る場所に設置することが推奨されます。

スクリプトを実行すると、以下の結果となります。

```sh:Bash
$ vi ~/script.txt
```

```txt:~/script.txt
[](/data/page/note/bash/post-RunAquesTalkPiOnX64/script.txt)
```

```sh:Bash
$ mkdir ~/export
$ generateYukkuriVoice ~/script.txt ~/export

Generate Data ... 0001.wav
Generate Data ... 0002.wav
Generate Data ... 0003.wav
Generate Data ... 0004.wav

$ ls ~/export

0001.wav
0002.wav
0003.wav
0004.wav
```

## How to Use (Advance 2)

ついでに、リアルタイムで会話するためのスクリプトも作成します。

```sh:/usr/local/bin/speakYukkuriVoice
[](/data/page/note/bash/post-RunAquesTalkPiOnX64/speakYukkuriVoice.sh)
```

スクリプトを実行すると、以下の結果となります。

```sh:Bash
$ speakYukkuriVoice

こんにちは！
ゆっくりしていってね！
exit
```

## Attention

正直なところ、グレーな使い方かもしれないので…必要があればライセンスを買いましょう！
