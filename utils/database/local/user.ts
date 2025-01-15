import { parse } from 'csv';

import { userData } from '@database/user.ts';

export const localUserDatabasePath = '/data/page/system/joke/account_backup.csv';

export const getLocalUserData = async (): Promise<userData[] | null> => {
    try {
        const csv = await Deno.readTextFile(Deno.cwd() + localUserDatabasePath);
        const json = await parse(csv, { skipFirstRow: true });

        return json as unknown[] as userData[];
    } catch (e) {
        console.error(e);

        return null;
    }
};
