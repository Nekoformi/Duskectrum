import { parse } from 'csv';

import { jokeData } from '@database/joke.ts';

export const localJokeDatabasePath = '/data/page/system/joke/joke_backup_2025_01_12.csv';

export const getLocalJokeData = async (): Promise<jokeData[] | null> => {
    try {
        const csv = await Deno.readTextFile(Deno.cwd() + localJokeDatabasePath);
        const json = await parse(csv, { skipFirstRow: true });

        return json as unknown[] as jokeData[];
    } catch (e) {
        console.error(e);

        return null;
    }
};
