// deno-lint-ignore-file no-explicit-any

import getClient from '@database/client.ts';
import { getUserDataByPass } from '@database/user.ts';
import { registeredFile } from '@islands/Original/Miscellaneous/FileUploader.tsx';

export interface jokeData {
    jokeId: string;
    userId: string;
    time: string;
    content: string;
    image?: string | registeredFile[] | null;
}

const normalizeJokeData = (rec: any): jokeData => {
    return {
        jokeId: rec.joke_id,
        userId: rec.user_id,
        time: rec.time,
        content: rec.content,
        image: rec.image,
    };
};

export const getAllJokeData = async () => {
    try {
        const client = await getClient();

        const res = await client.queryObject<jokeData>('select * from joke where is_error = false order by time desc');

        return res.rows.map((record) => normalizeJokeData(record));
    } catch (e) {
        console.error(e);

        return null;
    }
};

export const getPartJokeData = async (length: number, offset: number) => {
    try {
        const client = await getClient();

        const res = await client.queryObject<jokeData>('select * from joke where is_error = false order by time desc limit $1 offset $2', [length, offset]);

        return res.rows.map((record) => normalizeJokeData(record));
    } catch (e) {
        console.error(e);

        return null;
    }
};

export const getJokeDataLength = async () => {
    try {
        const client = await getClient();

        const res = await client.queryObject('select count(*) from joke');

        return Number((res.rows[0] as unknown as any).count);
    } catch (e) {
        console.error(e);

        return null;
    }
};

export const getJokeDataById = async (id: string) => {
    try {
        const client = await getClient();

        const res = await client.queryObject<jokeData>('select * from joke where joke_id = $1 and is_error = false', [id]);

        if (res.rowCount !== 1) return null;

        return normalizeJokeData(res.rows[0]);
    } catch (e) {
        console.error(e);

        return null;
    }
};

export const postJoke = async (rec: Pick<jokeData, 'userId' | 'content'>, pass: string) => {
    try {
        const client = await getClient();

        const userData = await getUserDataByPass(pass, { id: rec.userId });

        if (!userData || userData.id !== rec.userId) return 2;

        const res = await client.queryObject<jokeData>('insert into joke (user_id, content) values ($1, $2) returning *', [rec.userId, rec.content]);

        const id = normalizeJokeData(res.rows[0]).jokeId;

        await client.queryObject<jokeData>('update joke set is_error = false where joke_id = $1', [id]);

        return normalizeJokeData(res.rows[0]);
    } catch (e) {
        console.error(e);

        return 1;
    }
};

export const updateJoke = async (rec: Pick<jokeData, 'jokeId' | 'userId' | 'content'>, pass: string) => {
    try {
        const client = await getClient();

        const userData = await getUserDataByPass(pass, { id: rec.userId });

        if (!userData || userData.id !== rec.userId) return 2;

        const res = await client.queryObject<jokeData>('update joke set content = $1 where joke_id = $2 returning *', [rec.content, rec.jokeId]);

        if (res.rowCount !== 1) return 1;

        return 0; // normalizeJokeData(res.rows[0]);
    } catch (e) {
        console.error(e);

        return 1;
    }
};

export const deleteJoke = async (rec: Pick<jokeData, 'jokeId' | 'userId'>, pass: string) => {
    try {
        const client = await getClient();

        const userData = await getUserDataByPass(pass, { id: rec.userId });

        if (!userData || userData.id !== rec.userId) return 2;

        const res = await client.queryObject<jokeData>('delete from joke where joke_id = $1 returning *', [rec.jokeId]);

        if (res.rowCount !== 1) return 1;

        return 0; // normalizeJokeData(res.rows[0]);
    } catch (e) {
        console.error(e);

        return 1;
    }
};
