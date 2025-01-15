---
title: Easy Pear to Pear Chat System (E=CS)
date: 2024/05/19
author: Nekoformi
---

# Easy Pear to Pear Chat System (E=CS)

![?width=1280&height=720](/post/work/software/post-E_CS/Screenshot.png)

## リンク

- [GitHub Repositoryを閲覧する](https://github.com/Nekoformi/EasyPearToPearChatSystem)
- [E=CS.jarをダウンロードする](https://github.com/Nekoformi/EasyPearToPearChatSystem/releases/latest)

## 概要

これは私的にP2Pとセキュリティーを学習するために作成した簡易的なチャット・システムです。中央集権的なサーバーを必要とせず、各々のノードは簡単にネットワークを形成することができます。

## 使用方法

### 起動

アプリケーションはファイル（JAR）をダブルクリックするか、コンソールから実行します。例えば、以下のように：

```sh:Bash
$ java -jar E=CS.jar
```

オプションを追加することで、アプリケーションの起動をカスタマイズできます。例えば、以下のように：

```sh:Bash
$ java -jar E=CS.jar -x=0 -y=0 -n="Nekoformi" -join=0.0.0.0:20000,20001 -ssl -debug
```

#### 一般的なオプション

| オプション | 型 | 初期値 | 説明 |
| --- | --- | --- | --- |
| `x` `left` | `<整数>` | 0 | ウィンドウのX座標を設定します。 |
| `y` `top` | `<整数>` | 0 | ウィンドウのY座標を設定します。 |
| `w` `width` | `<正の整数>` | 640 | ウィンドウの横幅を設定します。 |
| `h` `height` | `<正の整数>` | 480 | ウィンドウの縦幅を設定します。 |
| `c` `center` | `<なし>` | false | ウィンドウを中央に配置します。 |
| `m` `maximize` | `<なし>` | false | ウィンドウを最大化します。 |
| `n` `name` | `<文字列>` | "Anonymous" | ユーザー名を設定します。アプリケーション内でも変更が可能です。 |
| `t` `timeout` | `<正の整数>` | 10000 | タイムアウト（ミリ秒）を設定します。 |
| `d` `download` | `<フォルダーパス>` | ./ | ダウンロードしたファイルを保存するフォルダーを設定します。 |
| `force-post` | `<なし>` | false | コマンド以外（「/」から始まらないもの）をメッセージとして投稿します。 |
| `force-string` | `<なし>` | false | バイナリーで送信する内容を強制的に文字列で送信します。このオプションは異なる基本システムを持つクライアントが通信に失敗する場合に役立つかもしれません。 |
| `message-size` | `<正の整数>` | 4096 | パケットの最大容量（バイト）を設定します。このオプションは異なる基本システムを持つクライアントが通信に失敗する場合に役立つかもしれません。 |
| `file-size` | `<正の整数>` | 1048576 | 送信するファイルの分割サイズ（バイト）を設定します。値が大きいほど受信者に多くのRAM容量が要求されます。 |
| `create` | `<ポート番号>` | - | 起動後にネットワークを作成します。 |
| `join` | `<IPアドレス>:<ポート番号>,<ポート番号>` | - | 起動後にネットワークに参加します。 |
| `ssl` | `<なし>` | false | SSL（セキュア・ソケット・レイヤー）を使用します。ただし、標準状態ではプロトコルを知るユーザーに対して意味がないことに注意してください。 |
| `debug` | `<なし>` | false | コンソールにログを出力します。 |
| `debug-color` | `<なし>` | false | コンソールに出力されるログに色を付けます。ログをファイルへリダイレクトする場合、このオプションを使用しないでください。 |

#### Ouroboros Node Networkに関するオプション

| オプション | 型 | 初期値 | 説明 |
| --- | --- | --- | --- |
| `b` `beacon` | `<正の整数>` | 10000 | ビーコンの発動頻度（ミリ秒）を設定します。ビーコンは設定された値の0.5〜2.0倍の頻度で発動します。値を0にするとビーコンは無効化されます。 |

#### SSLモードで有効になるオプション

| オプション | 型 | 説明 |
| --- | --- | --- |
| `pkc-file` | `<P12ファイル>` | PKCS（公開鍵暗号標準）ファイルを指定します。クライアント及びサーバーの証明書として指定されますが、これはノード間で通信を行うためです。 |
| `pkc-pass` | `<文字列>` | `pkc-file`の処理にパスフレーズが必要な場合に指定します。 |
| `jks-file` | `<JKSファイル>` | JKS（Java鍵ストア）ファイルを指定します。これはクライアントを証明するCA局の証明書（CRTファイル）を用いて[keytool](https://docs.oracle.com/javase/10/tools/keytool.htm)から作成できます。 |
| `jks-pass` | `<文字列>` | `jks-file`の処理にパスフレーズが必要な場合に指定します。 |
| `pkc-server-file` | `<P12ファイル>` | サーバーのPKCSファイルを指定します。 |
| `pkc-server-pass` | `<文字列>` | `pkc-server-file`の処理にパスフレーズが必要な場合に指定します。 |
| `pkc-client-file` | `<P12ファイル>` | クライアントのPKCSファイルを指定します。 |
| `pkc-client-pass` | `<文字列>` | `pkc-client-file`の処理にパスフレーズが必要な場合に指定します。 |

### 操作

ウィンドウの下部にある入力欄からメッセージの投稿やコマンドの実行が可能です。例えば、以下のように：

```
/n Nekoformi
/j 0.0.0.0:20000 20001
Hello world!
```

| コマンド | 引数 | 説明 |
| --- | --- | --- |
| `c` `create` | `<ポート番号>` | ネットワークを作成します。 |
| `j` `join` | `<IPアドレス>:<ポート番号>` `<ポート番号>` | ネットワークに参加します。 |
| `l` `leave` | `<なし>` | ネットワークから離脱します。 |
| `n` `name` | `<文字列 ...>` | ユーザー名を設定します。 |
| `m` `message` | `<文字列 ...>` | メッセージを投稿します。 |
| `f` `file` | `<ファイルパス ...>` | ファイルを投稿します。 |
| `fr` `file-request` | `<ユーザーID>` `<ファイルID>` | ファイルを取得します。 |
| `ff` `file-free` | `<ファイルID>` | 投稿したファイルを解放（取得できないように）します。 |
| `u` `update` | `<なし>` | ユーザーリストを更新します。 |
| `ls` `list` | `<なし>` | ユーザーリストを表示します。 |
| `lsk` `list-key` | `<なし>` | ユーザーの公開鍵を表示します。 |
| `cls` `clear` | `<なし>` | コンソールを初期化します。 |
| `clc` `clear-chat` | `<なし>` | チャット履歴を削除します。 |
| `cll` `clear-log` | `<なし>` | ログ履歴を削除します。 |
| `connect` | `<ユーザーID>` | ノードに接続します。 |
| `disconnect` | `<ユーザーID>` | ノードを切断します。 |
| `delay` | `<ユーザーID>` `<ミリ秒>` | ノードとの通信を（一方向に）遅延させます。このコマンドはテスト向けです。 |
| `con` `create-on` | (`<ユーザーID>` `<ダミーの数>`) \| (`<マップ構造>`) | Ouroboros Node Networkの経路を作成します。 |
| `son` `show-on` | `<ユーザーID>` | Ouroboros Node Networkの経路を表示します。 |
| `ron` `remove-on` | `<ユーザーID>` | Ouroboros Node Networkの経路を削除します。 |
| `eon` `edit-on` | `<ユーザーID A>` `<ユーザーID B>` `<ユーザーID C>` `<ユーザーID D>` `<フラグ>` | ユーザーAの経路についてユーザーBとユーザーCの間にユーザーDを挿入します。 |
| `eon` `edit-on` | `<ユーザーID A>` `<ユーザーID B>` `<ユーザーID C>` `<フラグ>` | ユーザーAの経路についてユーザーBの後方にユーザーCを追加します。 |
| `eon` `edit-on` | `<ユーザーID A>` `<ユーザーID B>` `<ユーザーID C>` | ユーザーAの経路についてユーザーBをユーザーCに置換します。 |
| `eon` `edit-on` | `<ユーザーID A>` `<ユーザーID B>` | ユーザーAの経路についてユーザーBを削除します。 |
| `mon` `message-on` | `<ユーザーID>` `<文字列 ...>` | Ouroboros Node Networkを利用して対象にメッセージを投稿します。 |
| `emon` `enqueue-message-on` | `<ユーザーID>` `<ダミーの数>` `<文字列 ...>` | ビーコンを受信した際にOuroboros Node Networkを利用して対象にメッセージを投稿します。 |
| `fon` `file-on` | `<ユーザーID>` `<ファイルパス ...>` | Ouroboros Node Networkを利用して対象にファイルを投稿します。 |
| `efon` `enqueue-file-on` | `<ユーザーID>` `<ダミーの数>` `<ファイルパス ...>` | ビーコンを受信した際にOuroboros Node Networkを利用して対象にファイルを投稿します。 |
| `b` `beacon` | `<VOID>` | ビーコンを起動します。 |
| `b` `beacon` | `<USER ID>` | ビーコンを起動します。 |

| フラグ | 名前 | 説明 |
| --- | --- | --- |
| `DUM` | 経由 | メッセージを経由するノードを示します。 |
| `PST` | 送信 | 送信ノード（自分自身）を示します。 |
| `REC` | 受信 | 受信ノード（通信相手）を示します。 |
| `FIN` | 終了 | 受信ノードは通信（循環）が終了されることを受け入れます。 |
| `DEL` | 削除 | メッセージを削除するノードを示します。 |
| `WAI` | 待機 | ダミーのうち、無作為な時間が経過した後にメッセージを送信するノードを示します。 |
| `REP` | 再送 | ダミーのうち、無作為な時間が経過した後にメッセージを再送するノードを示します。 |

## おまけ

### PKCSの作り方

```sh:Bash
openssl pkcs12 -export \
    -in "&lt;YOUR CERTIFICATE FILE&gt;.crt" \
    -inkey "&lt;YOUR PRIVATE KEY&gt;.key" \
    -certfile "&lt;CA CERTIFICATE FILE&gt;.crt" \
    -passout "&lt;PASS PHRASE&gt;" \
    -out "&lt;EXPORT FILE&gt;.p12"
```

### JKSの作り方

```sh:Bash
keytool -import \
    -file "&lt;CA CERTIFICATE FILE&gt;.crt" \
    -storepass "&lt;PASS PHRASE&gt;" \
    -keystore "&lt;EXPORT FILE&gt;.jks"
```

## 使用テクノロジー

- [Java Development Kit 22](https://www.oracle.com/java/technologies/downloads/)
- [OpenSSL](https://www.openssl.org/)

## 使用ライブラリー

- [FlatLaf](https://www.formdev.com/flatlaf/)
