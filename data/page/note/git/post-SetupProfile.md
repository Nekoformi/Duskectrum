---
title: Setup Profile
date: 2024/04/15
author: Nekoformi
---

# Setup Profile

Gitの操作（コミット等）にはユーザー名とメールアドレスの登録が必要になります。

```sh:Bash
// 全体に設定する場合
$ git config --global user.name ユーザー名
$ git config --global user.email メールアドレス

// 特定のリポジトリーに設定する場合
$ git config --local user.name ユーザー名
$ git config --local user.email メールアドレス
```

※コミットの記録に必要な情報であり、何かしらのサービスに登録されるわけではありません。
