---
title: Convert Markdown to JSX Element
date: 2024/04/13
author: Nekoformi
---

# Convert Markdown to JSX Element

本ウェブサイトのNoteは全てMarkdown形式で記述されていますが、これらをHTML（JSX Element）として変換する際に特定の要素を自作したコンポーネントへ置き換えるためにはDOMに対する理解と多少の狂気が必要になります。特にDenoはMDXを取り扱うモジュールが（2024年04月の時点では）存在しないため、私が勝手に関数を作ってしまいました。

## 目標

- Markdownに記述されている特定の要素（コンポーネントではなく、ユーザーが設定した独自の記法）を自作のコンポーネントに置換します。
- 置換の過程で非同期関数（ファイルの読み込み等）の実行を可能にします。
- プロパティー：`dangerouslySetInnerHTML`を使用しません。

## 1. 準備

初めに、以下のモジュールを導入・使用します。

- [Marked](https://www.npmjs.com/package/marked)：Markdown（文字列）をHTML（文字列）にパースします。
- [front-matter](https://www.npmjs.com/package/front-matter)：Markdown（文字列）に記述されたメタデータを抽出します。
- [sanitize-html](https://www.npmjs.com/package/sanitize-html)：HTML（文字列）をサニタイズします。
- [Deno DOM](https://deno.land/x/deno_dom)：DOMを取り扱います。
- [Assertions](https://deno.land/std/assert/assert.ts)：変数の内容をアサーションします。

```json:deno.json
{
    ...
    "imports": {
        ...
        "marked": "https://esm.sh/marked@12.0.1",
        "front-matter": "https://esm.sh/front-matter@4.0.2",
        "sanitize-html": "https://esm.sh/sanitize-html@2.13.0",
        "deno-dom-wasm": "https://deno.land/x/deno_dom@v0.1.45/deno-dom-wasm.ts",
        "deno-assert": "https://deno.land/std@0.216.0/assert/assert.ts",
        ...
    },
    ...
}
```

## 2. ページの作成

ルーティング（記事を表示）するページを作成します。

```typescript:/routes/note/[...post].tsx
[](/data/page/note/deno_fresh/post-ConvertMarkdownToJsxElement/post.tsx)
```

- ファイル名を`[...文字列].tsx`にすることで動的なパスをホストできます。また、カスタムハンドラー（`ctx.params`）のプロパティーからパス（文字列）を取得することができます。
- 使用しない変数は名前を`_`もしくは`_変数名`にすることで警告を無視できます。
- `import`に記述されている`@function/original`は私が個別に定義したパスなので、実際に使用する際は正式なパスを記述するか、`deno.json`で定義する必要があります。

## 3. Markdown → HTML

MarkdownをHTMLに変換するための関数：`convertMarkdownToHtmlString()`を作成します。

```typescript:@function/original/convertMarkdownToHtmlString.tsx
[](/data/page/note/deno_fresh/post-ConvertMarkdownToJsxElement/convertMarkdownToHtmlString.tsx)
```

- 保守性を高めるため、各オプションを別のファイルに記述しています。
- `marked.use`のプロパティーについて、`extensions`で変換時の処理、`hooks`で変換前の処理を設定することができます。
- `文字列.trim()`でテキストの先頭と末尾に含まれる空白や改行を除去することができます。

```typescript:@function/original/myMarkdownConfig.tsx
[](/data/page/note/deno_fresh/post-ConvertMarkdownToJsxElement/myMarkdownConfigA.tsx)
```

- [Marked](https://www.npmjs.com/package/marked)の設定については[公式の資料](https://github.com/markedjs/marked/blob/master/docs/USING_PRO.md)をご覧ください。
- [sanitize-html](https://www.npmjs.com/package/sanitize-html)の設定については[公式の資料](https://github.com/apostrophecms/sanitize-html)をご覧ください。
- `token`に与えられるコンテンツはエスケープされているため、該当する記号を使用する場合はアンエスケープ：`unescapeHtml()`する必要があります。

```typescript:@function/htmlMarkup.ts
[](/data/page/note/deno_fresh/post-ConvertMarkdownToJsxElement/htmlMarkup.ts)
```

- `new RegExp()`で文字列から正規表現を生成することができます。

## 4. HTML → JSX Element

文字列で出力されたHTMLをJSX Elementに変換するための関数：`convertHtmlStringToJsxElement()`を作成します。

```typescript:@function/original/convertHtmlStringToJsxElement.tsx
[](/data/page/note/deno_fresh/post-ConvertMarkdownToJsxElement/convertHtmlStringToJsxElement.tsx)
```

- 非同期（`async`／`await`）の無名関数を作成する場合は`await (async (): Promise<T> => { ... })();`と記述します。
- JSX Elementの配列を出力する際は`join()`等の正規化を行わないでください。
- `renderer`に登録されたオブジェクトについて`function`が記述されていない（`null`の）場合、子の内容を返します。
- `HTMLDocument`に含まれるNodeをElementとして使用する場合は`変数 as unknown as Element`でダブルアサーションする必要があります。

```typescript:@function/original/myMarkdownConfig.tsx
[](/data/page/note/deno_fresh/post-ConvertMarkdownToJsxElement/myMarkdownConfigB.tsx)
```

- `Deno.readTextFile()`でサイト内にホストされているデータへアクセスする場合は`Deno.cwd() + 絶対パス`を指定する必要があります。
