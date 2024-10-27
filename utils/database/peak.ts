import getClient from '@database/client.ts';
import getSha256 from '@function/getSha256.ts';

export const postingTimeIntervalLimit = 1; // minutes

const publicColumn = 'peak_id, room_id, time, name, address, content';

export interface peakData {
    peakId: string;
    roomId: string;
    time: string;
    name: string;
    sign: string;
    content: string;
}

// deno-lint-ignore no-explicit-any
const normalizePeakData = (rec: any): peakData => {
    return {
        peakId: rec.peak_id,
        roomId: rec.room_id,
        time: rec.time,
        name: rec.name,
        sign: String(rec.address).substring(0, 8).toUpperCase(),
        content: rec.content,
    };
};

export const getAllPeakData = async () => {
    try {
        const client = await getClient();

        const res = await client.queryObject<peakData>(`select ${publicColumn} from peak where is_error = false order by time desc`);

        return res.rows.map((record) => normalizePeakData(record));
    } catch (e) {
        console.error(e);

        return null;
    }
};

export const getAllPeakDataByRoomId = async (roomId: string) => {
    try {
        const client = await getClient();

        const res = await client.queryObject<peakData>(`select ${publicColumn} from peak where room_id = $1 and is_error = false order by time desc`, [roomId]);

        return res.rows.map((record) => normalizePeakData(record));
    } catch (e) {
        console.error(e);

        return null;
    }
};

export const getPeakDataByPeakId = async (peakId: string) => {
    try {
        const client = await getClient();

        const res = await client.queryObject<peakData>(`select ${publicColumn} from peak where peak_id = $1 and is_error = false`, [peakId]);

        if (res.rowCount !== 1) return null;

        return normalizePeakData(res.rows[0]);
    } catch (e) {
        console.error(e);

        return null;
    }
};

export const postPeak = async (rec: Pick<peakData, 'roomId' | 'name' | 'content'>, address: string, pass: string) => {
    try {
        const client = await getClient();
        const addressHash = await getSha256(address);
        const postingTime = new Date();

        postingTime.setMinutes(postingTime.getMinutes() - postingTimeIntervalLimit);

        if (
            (
                await client.queryObject<peakData>('select peak_id from peak where room_id = $1 and address = $2 and time > $3', [
                    rec.roomId,
                    addressHash,
                    postingTime,
                ])
            ).rowCount !== 0
        ) {
            return 2;
        }

        const res = await client.queryObject<peakData>(
            `insert into peak (room_id, name, address, pass, content) values ($1, $2, $3, $4, $5) returning ${publicColumn}`,
            [rec.roomId, rec.name, addressHash, '', rec.content],
        );

        const id = normalizePeakData(res.rows[0]).peakId;
        const passHash = await getSha256(`${id}+${pass}`);

        if ((await client.queryObject<peakData>(`update peak set pass = $1 where peak_id = $2 returning ${publicColumn}`, [passHash, id])).rowCount !== 1) {
            return 1;
        }

        await client.queryObject<peakData>('update peak_room set updated_at = $1 where id = $2', [res.rows[0].time, rec.roomId]);

        await client.queryObject<peakData>('update peak set is_error = false where peak_id = $1', [id]);

        return 0; // normalizePeakData(res.rows[0]);
    } catch (e) {
        console.error(e);

        return 1;
    }
};

export const updatePeak = async (rec: Pick<peakData, 'peakId' | 'roomId' | 'content'>, pass: string) => {
    try {
        const client = await getClient();
        const passHash = await getSha256(`${rec.peakId}+${pass}`);

        const res = await client.queryObject<peakData>(
            `update peak set content = $1 where peak_id = $2 and room_id = $3 and pass = $4 returning ${publicColumn}`,
            [rec.content, rec.peakId, rec.roomId, passHash],
        );

        if (res.rowCount !== 1) return 1;

        return 0; // normalizePeakData(res.rows[0]);
    } catch (e) {
        console.error(e);

        return 1;
    }
};

export const deletePeak = async (rec: Pick<peakData, 'peakId' | 'roomId'>, pass: string) => {
    try {
        const client = await getClient();
        const passHash = await getSha256(`${rec.peakId}+${pass}`);

        const res = await client.queryObject<peakData>(`delete from peak where peak_id = $1 and room_id = $2 and pass = $3 returning ${publicColumn}`, [
            rec.peakId,
            rec.roomId,
            passHash,
        ]);

        if (res.rowCount !== 1) return 1;

        return 0; // normalizePeakData(res.rows[0]);
    } catch (e) {
        console.error(e);

        return 1;
    }
};
