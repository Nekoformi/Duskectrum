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
