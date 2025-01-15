---
title: Setup Proxy Environment
date: 2024/04/15
author: Nekoformi
---

# Setup Proxy Environment

大学や職場からリモートのGitリポジトリーを操作する場合はプロキシーを設定する必要があるかもしれません。

```sh:Bash
// 全体に設定する場合
$ git config --global http.proxy http://プロキシーのアドレス:ポート番号

// 特定のリポジトリーに設定する場合
$ git config --local http.proxy http://プロキシーのアドレス:ポート番号
```

プロキシーの設定を元に戻す（削除する）場合は以下のコマンドを実行します。

```sh:Bash
// 全体に設定する場合
$ git config --global --unset http.proxy

// 特定のリポジトリーに設定する場合
$ git config --local --unset http.proxy
```

設定を確認する場合は以下のコマンドを実行します。結果に含まれる`http.proxy`が指定したアドレス、もしくは空であれば成功です。

```sh:Bash
// 全体の設定を確認する場合
$ git config --global -l

// 特定のリポジトリーの設定を確認する場合
$ git config --local -l
```
