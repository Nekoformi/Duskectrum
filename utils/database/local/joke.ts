import { jokeData } from '@database/joke.ts';
import { parse } from 'csv';

const localJokeDatabasePath = '/data/page/system/joke/joke_backup_2024_12_12.csv';

export const getLocalJokeData = async (): Promise<jokeData[]> => {
    const csv = await Deno.readTextFile(Deno.cwd() + localJokeDatabasePath);
    const json = await parse(csv, { skipFirstRow: true });

    return json as unknown[] as jokeData[];
};
