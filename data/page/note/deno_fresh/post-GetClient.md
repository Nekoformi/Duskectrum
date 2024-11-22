---
title: Get Client
date: 2024/04/26
author: Nekoformi
---

# Get Client

本ウェブサイトは[とあるブログ記事](https://zenn.dev/azukiazusa/articles/fresh-tutorial)を参考に開発したのですが、その中で「[Deno Deploy](https://deno.com/deploy)にアップロードするとデータベースのクライアントの取得に失敗する」というエラーが発生したので、[とあるプログラマーの神](https://github.com/nzws)に解決してもらいました。

```typescript:client.ts
import 'dotenv/load.ts';

import { Client } from 'postgress';

export const client = new Client({
    user: Deno.env.get('DB_USER'),
    database: Deno.env.get('DB_NAME'),
    hostname: Deno.env.get('DB_HOST'),
    port: Deno.env.get('DB_PORT'),
    password: Deno.env.get('DB_PASSWORD'),
});

await client.connect();
```

```typescript:someDatabaseFunction.ts
import { client } from '.../client.ts';

export const someDatabaseFunction = async () => {
    try {
        await client.queryObject&lt;someDatabaseType&gt;(...);

        ...
    } catch (e) {
        console.error(e);

        ...
    }
};
```

このコードではセキュリティーが云々と言われたので

```typescript:client.ts
import 'dotenv/load.ts';

import { Client } from 'postgress';

async function createClient() {
    const client = new Client({
        user: Deno.env.get('DB_USER'),
        database: Deno.env.get('DB_NAME'),
        hostname: Deno.env.get('DB_HOST'),
        port: Deno.env.get('DB_PORT'),
        password: Deno.env.get('DB_PASSWORD'),
    });

    await client.connect();

    return client;
}

let client: Client | undefined;

export default async function getClient() {
    if (!client) client = await createClient();

    return client;
}
```

```typescript:someDatabaseFunction.ts
import getClient from '.../client.ts';

export const someDatabaseFunction = async () => {
    try {
        const client = await getClient();

        await client.queryObject&lt;someDatabaseType&gt;(...);

        ...
    } catch (e) {
        console.error(e);

        ...
    }
};
```

こうすることで、全てが解決しました。
