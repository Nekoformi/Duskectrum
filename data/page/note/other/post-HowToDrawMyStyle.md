---
title: How to Draw My Style
date: 2024/06/09
author: Sara Kotova
---

# How to Draw My Style

液晶タブレットを購入した際に[MediBang Paint Pro](https://medibangpaint.com/)を導入して、コミックマーケット（日本）で[CLIP STUDIO TABMATE](https://www.clipstudio.net/promotion/tabmate)を購入した際に貰った[CLIP STUDIO PAINT DEBUT](https://www.clipstudio.net/ja/function_debut/)を導入して、友人のすゝめでLinuxへ乗り換えた際に[Krita](https://krita.org/ja/)を導入したという変な経歴を持つ私ですが、今回はKritaへ移行した記念に、私の制作過程を備忘録として纏めてみました。

## 1. 準備

初めに[Gensokyo Radio](https://gensokyoradio.net/playing/)を再生します。作業が長引く場合は[Retrowave Radio](https://retrowave.ru/)もオススメです。好きな音楽を聴きましょう♪

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0001.png '')

キャンバスを用意します。サイズは4096 * 4096 pxです。このくらいのサイズだと、4Kの画像にも対応できるので便利です。

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0002.png '')

グリーンバックと下描き用のレイヤーを追加します。前者は、色の塗り残しを容易に発見できます。

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0003.png '')

## 2. 描画

下描きを作成します。今回のテーマは正面を向いたSDキャラクターのイラストなので、必要に応じて「左右対称描画ツール」を使用しました。体、髪、そして装飾品を別のレイヤーに異なる色（原色に近いもの）で描画すると、修正や調整が楽になります。ペンは「Basic-5 Size」の40 pxを使用しましたが、特に拘りはありません。

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0004.png '')

丁寧に線画を清描します。ペンは「Ink-4 Pen Rough」の40 pxです。筆圧で線の太さを調整していますが、慣れない場合はブラシのサイズを変更しながら描きましょう。

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0005.png '')

続いて、塗り潰し不完全問題（正式名称不明）を解決するために…私の場合は、鋭利な箇所を線画の段階で加筆します。例えば、こんな感じの空間を―

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0006.png '')

こんな感じに丸めます。かなりの確率で幾つかの未修正箇所が残るため、一通り完了したら上から順に確認しましょう。

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0007.png '')

修正が完了したら色を塗る…前に、線画の不透明度を50%に設定して、その下にレイヤーを追加します。また、白目が肌色で塗り潰されてしまうので、白目の境界を描きます。

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0008.png '')

これでOK！　残りも満遍なく塗り潰します。

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0009.png '')

塗色が終わったら、改めて塗り残しがないか確認しましょう。

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0010.png '')

塗色は大丈夫でも、線画に塗り残しがあるかもしれません。「近似色選択ツール」で黒色（#000000）を選択して、その正体を暴きましょう。

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0011.png '')

塗り残しを一時的に可視化するため、レイヤーを追加して、選択範囲を反転して、赤色で塗り潰します。

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0012.png '')

このまま該当箇所を黒色で塗り潰しても良いのですが、賢い方法があります。まずは塗色のレイヤーの不透明領域を選択して、選択範囲をクリアします。

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0013.png '')

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0014.png '')

次に「連続領域選択ツール」で外枠を選択して、選択範囲を5 px広げてクリアします。

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0015.png '')

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0016.png '')

最後に赤色を黒色に塗り替えて、線画のレイヤーへ統合して完了です。

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0017.png '')

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0018.png '')

## 3. 加工

線画の色を柔らかくしたいので、線画のレイヤーの上に単色のレイヤーを追加して、クリッピングして、これらをグループに纏めます。この原理については[公式のチュートリアル](https://docs.krita.org/ja/tutorials/clipping_masks_and_alpha_inheritance.html)が解説しているので、気になる方はドウゾ。

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0019.png '')

グリーンバックを非表示にして、キャンバスを画像として出力します。

![?width=960&height=540](/post/note/other/post-HowToDrawMyStyle/0020.png '')

最後にGIMPで縁を太くしたりノイズを加えたり…良い感じになったら完成です。

![?width=1024&height=1024](/post/note/other/post-HowToDrawMyStyle/0021.png '')
