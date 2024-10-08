---
title: Backup Volume
date: 2024/02
author: Nekoformi
---

# Backup Volume

何度も同じ環境を構築する場合や機材の大事に備える場合は、ストレージのバックアップを推奨します。

## 準備

1. DVDやUSBメモリーを用いてライブ起動するストレージを作成します。
    1. Linuxディストリビューションのイメージファイルをダウンロードします。特に拘りがなければ[Ubuntu](https://ubuntu.com/download)や[Debian](https://www.debian.org/)といったメジャーなLinuxディストリビューションを選択しましょう。
    2. ストレージを起動可能にするソフトウェア（例えば[balenaEtcher](https://etcher.balena.io/)や[Rufus](https://rufus.ie/en/)等）を利用してストレージにイメージファイルを書き込みます。
    3. 対象のコンピューターを起動します。その際に、BIOSやUEFIから起動デバイスの選択、あるいは変更を行います。
    4. ライブ起動を選択してLinuxを立ち上げます。
    - 起動に失敗する場合は、異なるLinuxディストリビューションやバージョンを使用することで成功するかもしれません。
2. インターネットに接続します。
3. ターミナルを起動して必要なパッケージを入手します。
    - **GParted**：ボリュームを視覚的に編集します。
    - **Parallel G-Zip**：マルチコア（並列処理）でファイルの圧縮や解凍を行います。
    - **Pipe Viewer**：パイプに流れるデータの状況を表示します。

```sh:Bash
$ sudo apt -y install gparted
$ sudo apt -y install pigz
$ sudo apt -y install pv
```

## バックアップ

1. `lsblk`コマンドでデバイスの一覧を表示します。ここで、バックアップ元とバックアップ先を確認します。
2. 必要に応じてGPartedでパーティションテーブルの作成を行います。
3. 以下のコマンドでボリュームのバックアップを行います。
    - 文字列に空白（` `）が含まれる場合は空白をエスケープ（`\ `）するか、引用符（`"`）で囲む必要があります。
    - パスやバッファリングサイズ、オプションは場合に応じて変更してください。
    - 時間を短縮する（演算よりも入出力に時間が掛かる）ため、`dd`コマンドで取得したボリュームのデータを圧縮してからファイルへ出力します。

```sh:Bash
$ sudo dd if=/dev/nvme0n1 bs=16M | pv | pigz > "/media/${USER}/Backup Volume/nvme0n1.gz"
```

## バックダウン

1. `lsblk`コマンドでデバイスの一覧を表示します。ここで、バックダウン元とバックダウン先を確認します。
2. 必要に応じてGPartedでパーティションテーブルの作成を行います。
3. 以下のコマンドでボリュームのバックダウンを行います。
    - 時間を短縮する（演算よりも入出力に時間が掛かる）ため、`unpigz`コマンドでファイルを展開してからボリュームにデータを出力します。

```sh:Bash
$ unpigz -c < "/media/${USER}/Backup Volume/nvme0n1.gz" | pv | sudo dd of=/dev/nvme0n1 bs=16M
```
