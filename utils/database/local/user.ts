import { userData } from '@database/user.ts';
import { parse } from 'csv';

const localUserDatabasePath = '/data/page/system/joke/account_backup.csv';

export const getLocalUserData = async (): Promise<userData[]> => {
    const csv = await Deno.readTextFile(Deno.cwd() + localUserDatabasePath);
    const json = await parse(csv, { skipFirstRow: true });

    return json as unknown[] as userData[];
};
