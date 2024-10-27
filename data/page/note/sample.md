---
title: Sample
date: 2024/04/12
author: Nekoformi
---

# 見出し1 | Heading 1
## 見出し2 | Heading 2
### 見出し3 | Heading 3
#### 見出し4 | Heading 4
##### 見出し5 | Heading 5
###### 見出し6 | Heading 6

---

## 文章 | Paragraph

いろはにほへとちりぬるを
The quick brown fox jumps over the lazy dog

## 文字 | Text

### 通常 | Normal

いろはにほへとちりぬるを
The quick brown fox jumps over the lazy dog

### 太字 | Bold

**いろはにほへとちりぬるを**
**The quick brown fox jumps over the lazy dog**

### 斜体 | Italic

*いろはにほへとちりぬるを*
*The quick brown fox jumps over the lazy dog*

### 打消 | Denial

~~いろはにほへとちりぬるを~~
~~The quick brown fox jumps over the lazy dog~~

### リンク | Link

[いろはにほへとちりぬるを](https://ja.wikipedia.org/wiki/%E3%81%84%E3%82%8D%E3%81%AF%E6%AD%8C)
[The quick brown fox jumps over the lazy dog](https://ja.wikipedia.org/wiki/The_quick_brown_fox_jumps_over_the_lazy_dog)

### コード | Code

`いろはにほへとちりぬるを`
`The quick brown fox jumps over the lazy dog`

### 変数 | Variable

```JavaScript
function isPrimeNumber(n) {
    if (n == 1) return false;
    if (n == 2) return true;

    for (i = 2; i < n; i++) {
        if (n % i == 0) return false;
        if (i + 1 == n) return true;
    }
}
```

これは<var>n</var>に入力された数値が素数か否かを判定する関数である。
This is a function that judges whether <var>n</var> is a prime number.

## ブロック | Block

### 引用 | Quote

> いろはにほへとちりぬるを
> The quick brown fox jumps over the lazy dog

## リスト | List

### 箇条書き | Bullet Points

- **対偶法**
    - 命題 P⇒Q を証明する代わりに、これと同値な ￢Q⇒￢P を証明する方法。
- **背理法 (帰謬法)**
    - 命題 P を証明する代わりに、￢P が偽であることを証明する方法。
    - ￢P が偽であることを証明するには、￢P を仮定して矛盾を導けばよい。
- **反例**
    - 命題「全ての x が P(x) を満たす」が偽であることを示すには、P(x) を満たさない x を一つ挙げればよい。
    - ￢∀xPx と ∃x￢Px が同値であることを利用する。
- **転換法**
    - 全ての状況が P, Q, R のいずれかに分類でき、A, B, C が独立であり、「P⇒A」「Q⇒B」「R⇒C」が証明できる場合、それらの逆「A⇒P」「B⇒Q」「C⇒R」も成立する。
- **同一法**
    - A⇒B が成り立ち、B を満たすものがただひとつであれば、B⇒A が成り立つ。
- **鳩の巣原理**
    - n+1 個以上のボールのそれぞれが n 個の箱のいずれかに入る場合、少なくとも 1 個の箱には 2 個以上のボールが入っている。
- **数学的帰納法**
    - 自然数に関する命題 P(n) が全ての n に対して成立することを示す論法。
    1. P(1) が成立することを示す。
    2. P(n) が成立すれば P(n+1) が成立することを示す。

> [Wikipedia - 証明 (数学)](https://ja.wikipedia.org/wiki/%E8%A8%BC%E6%98%8E_(%E6%95%B0%E5%AD%A6))

## テーブル | Table

| 番号 | 名前 | 得点 |
| --- | --- | --: |
| 0001 | アリス | 12.3 |
| 0002 | ボブ | 45.6 |
| 0003 | マーヴィン | 78.9 |

> [Wikipedia - アリスとボブ](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%AA%E3%82%B9%E3%81%A8%E3%83%9C%E3%83%96)

## メディア | Media

### 画像 | Image

![Retrowaveのイメージ](https://images8.alphacoders.com/866/866391.jpg '図 1. Retrowaveのイメージ')
