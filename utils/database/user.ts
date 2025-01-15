import getClient from '@database/client.ts';

const publicColumn = 'id, display';

export interface userData {
    id: string;
    display: string;
}

// deno-lint-ignore no-explicit-any
const normalizeUserData = (rec: any): userData => {
    return {
        id: rec.id,
        display: rec.display,
    };
};

export const getAllUserData = async () => {
    try {
        const client = await getClient();

        const res = await client.queryObject<userData>(`select ${publicColumn} from account`);

        return res.rows.map((record) => normalizeUserData(record));
    } catch (e) {
        console.error(e);

        return null;
    }
};

export const getUserDataById = async (id: string) => {
    try {
        const client = await getClient();

        const res = await client.queryObject<userData>(`select ${publicColumn} from account where id = $1`, [id]);

        if (res.rowCount !== 1) return null;

        return normalizeUserData(res.rows[0]);
    } catch (e) {
        console.error(e);

        return null;
    }
};

export const getUserDataByPass = async (pass: string, idea: { id?: string; name?: string }) => {
    try {
        const client = await getClient();

        let res;

        if (idea.id) {
            res = await client.queryObject<userData>(`select ${publicColumn} from account where id = $1 and pass = $2`, [idea.id, pass]);
        } else if (idea.name) {
            res = await client.queryObject<userData>(`select ${publicColumn} from account where name = $1 and pass = $2`, [idea.name, pass]);
        } else {
            return null;
        }

        if (res.rowCount !== 1) return null;

        return normalizeUserData(res.rows[0]);
    } catch (e) {
        console.error(e);

        return null;
    }
};
