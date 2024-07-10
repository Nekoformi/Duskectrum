import getClient from '@database/client.ts';
import getSha256 from '@function/getSha256.ts';

export const creatingTimeIntervalLimit = 1; // minutes

const publicColumn = 'id, created_at, updated_at, host_name, host_address, title, pass, summary';

export interface peakRoomData {
    id: string;
    createdAt: string;
    updatedAt: string;
    hostName: string;
    hostSign: string;
    title: string;
    pass?: string;
    isPrivate?: boolean;
    summary: string;
}

// deno-lint-ignore no-explicit-any
const normalizePeakRoomData = (rec: any): peakRoomData => {
    return {
        id: rec.id,
        createdAt: rec.created_at,
        updatedAt: rec.updated_at,
        hostName: rec.host_name,
        hostSign: String(rec.host_address).substring(0, 8).toUpperCase(),
        title: rec.title,
        isPrivate: rec.pass !== '',
        summary: rec.summary,
    };
};

export const getAllPeakRoomData = async () => {
    try {
        const client = await getClient();

        const res = await client.queryObject<peakRoomData>(`select ${publicColumn} from peak_room where is_error = false order by updated_at desc`);

        return res.rows.map((record) => normalizePeakRoomData(record));
    } catch (e) {
        console.error(e);

        return null;
    }
};

export const getPeakRoomDataById = async (id: string) => {
    try {
        const client = await getClient();

        const res = await client.queryObject<peakRoomData>(`select ${publicColumn} from peak_room where id = $1 and is_error = false`, [id]);

        if (res.rowCount !== 1) return null;

        return normalizePeakRoomData(res.rows[0]);
    } catch (e) {
        console.error(e);

        return null;
    }
};

export const isCorrectRoomPass = async (id: string, pass: string) => {
    try {
        const client = await getClient();

        const rec = await client.queryObject<peakRoomData>('select id from peak_room where id = $1 and pass = $2 and is_error = false', [id, pass]);

        if (rec.rowCount !== 1) return null;

        return normalizePeakRoomData(rec.rows[0]);
    } catch (e) {
        console.error(e);

        return null;
    }
};

export const createPeakRoom = async (rec: Pick<peakRoomData, 'hostName' | 'title' | 'pass' | 'summary'>, hostAddress: string, hostPass: string) => {
    try {
        const client = await getClient();
        const hostAddressHash = await getSha256(hostAddress);
        const creatingTime = new Date();

        creatingTime.setMinutes(creatingTime.getMinutes() - creatingTimeIntervalLimit);

        if (
            (await client.queryObject<peakRoomData>('select id from peak_room where host_address = $1 and created_at > $2', [hostAddressHash, creatingTime]))
                .rowCount !== 0
        ) {
            return 2;
        }

        const buf = await client.queryObject<peakRoomData>(
            `insert into peak_room (host_name, host_address, host_pass, title, pass, summary) values ($1, $2, $3, $4, $5, $6) returning ${publicColumn}`,
            [rec.hostName, hostAddressHash, '', rec.title, '', rec.summary],
        );

        const id = normalizePeakRoomData(buf.rows[0]).id;
        const hostPassHash = await getSha256(`${id}+${hostPass}`);

        if (
            (await client.queryObject<peakRoomData>(`update peak_room set host_pass = $1 where id = $2 returning ${publicColumn}`, [hostPassHash, id]))
                .rowCount !== 1
        ) {
            return 1;
        }

        if (rec.pass) {
            const passHash = await getSha256(`${id}+${rec.pass}`);

            const res = await client.queryObject<peakRoomData>(`update peak_room set pass = $1 where id = $2 returning ${publicColumn}`, [passHash, id]);

            if (res.rowCount !== 1) return 1;

            await client.queryObject<peakRoomData>('update peak_room set is_error = false where id = $1', [id]);

            return 0; // normalizePeakRoomData(res.rows[0]);
        } else {
            await client.queryObject<peakRoomData>('update peak_room set is_error = false where id = $1', [id]);

            return 0; // normalizePeakRoomData(buf.rows[0]);
        }
    } catch (e) {
        console.error(e);

        return 1;
    }
};

export const updatePeakRoom = async (rec: Pick<peakRoomData, 'id' | 'title' | 'summary'>, hostPass: string) => {
    try {
        const client = await getClient();
        const hostPassHash = await getSha256(`${rec.id}+${hostPass}`);

        const res = await client.queryObject<peakRoomData>(
            `update peak_room set title = $1, summary = $2 where id = $3 and host_pass = $4 returning ${publicColumn}`,
            [rec.title, rec.summary, rec.id, hostPassHash],
        );

        if (res.rowCount !== 1) return 1;

        return 0; // normalizePeakRoomData(res.rows[0]);
    } catch (e) {
        console.error(e);

        return 1;
    }
};

export const deletePeakRoom = async (rec: Pick<peakRoomData, 'id'>, hostPass: string) => {
    try {
        const client = await getClient();
        const hostPassHash = await getSha256(`${rec.id}+${hostPass}`);

        await client.queryObject<peakRoomData>('delete from peak where room_id = $1', [rec.id]);

        const res = await client.queryObject<peakRoomData>(`delete from peak_room where id = $1 and host_pass = $2 returning ${publicColumn}`, [
            rec.id,
            hostPassHash,
        ]);

        if (res.rowCount !== 1) return 1;

        return 0; // normalizePeakRoomData(res.rows[0]);
    } catch (e) {
        console.error(e);

        return 1;
    }
};
