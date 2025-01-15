import { FreshContext } from '$fresh/server.ts';
import { USE_DATABASE_TYPE, USE_STORAGE_TYPE } from '@data/dev.ts';
import { deleteJoke, getJokeDataById } from '@database/joke.ts';
import { deleteJokeImage, getJokeImageLink } from '@database/jokeStorage.ts';
import { getLocalJokeData } from '@database/local/joke.ts';
import { testJokeDatabase } from '@database/test/joke.ts';
import { getUserDataByPass } from '@database/user.ts';
import concatWords from '@function/concatWords.ts';
import getSha256 from '@function/getSha256.ts';

export type deleteJokeProps = {
    req?: Request;
    res: number;
    jokeId?: string;
    error?: string;
    rec?: {
        name?: string;
        content?: string;
    };
};

export const returnNullProps = (code: number): deleteJokeProps => ({ res: code });

/* -----------------------------------------------------------------------------

Response Code:
    0. Successful processing completed.
    1. A clear error occurred.
    2. Required data does not exist.
    3. An unexpected status specified.
    4. An unexpected handle specified.

----------------------------------------------------------------------------- */

export const selectJokeData = async (jokeId: string): Promise<deleteJokeProps> => {
    if (!jokeId) returnNullProps(2);

    const jokeData = USE_DATABASE_TYPE === 2
        ? await getJokeDataById(jokeId)
        : (USE_DATABASE_TYPE === 1 ? await getLocalJokeData() || [] : testJokeDatabase).find((item) => item.jokeId === jokeId);

    if (!jokeData) {
        return {
            res: 1,
            jokeId: jokeId,
            error: 'System error!',
        };
    }

    const jokeImageLink = USE_STORAGE_TYPE === 2 ? getJokeImageLink(jokeData) : undefined;

    if (jokeImageLink === null) {
        return {
            res: 1,
            jokeId: jokeId,
            error: 'System error!',
        };
    }

    return {
        res: 0,
        jokeId: jokeId,
        rec: {
            name: '',
            content: jokeData.content + (jokeImageLink ? `\n\n+ ${jokeImageLink.length} image(s)` : ''),
        },
    };
};

export const deleteJokeData = async (jokeId: string, name: string, code: string, content: string): Promise<deleteJokeProps> => {
    const returnErrorProps = (error: string | undefined) => ({
        res: 1,
        jokeId: jokeId,
        error: error,
        rec: {
            name: name,
            content: content,
        },
    });

    if (!jokeId) return returnNullProps(2);

    if (USE_DATABASE_TYPE !== 2) return returnErrorProps('This feature is not available in test / local mode!');

    const jokeData = await getJokeDataById(jokeId);

    if (!jokeData) return returnErrorProps('Failed to get joke!');

    if (!name || !code) return returnErrorProps(`Please enter ${concatWords([!name ? 'name' : '', !code ? 'code' : ''])}!`);

    const pass = await getSha256(`${name}+${code}`);

    const userData = await getUserDataByPass(pass, { name: name });

    if (!userData) return returnErrorProps('User authentication failed!');

    const deleteJokeResult = await deleteJoke(
        {
            jokeId: jokeId,
            userId: userData.id,
        },
        pass,
    );

    if (deleteJokeResult !== 0) {
        switch (deleteJokeResult) {
            case 1:
                return returnErrorProps('Failed to delete joke content!');
            case 2:
                return returnErrorProps('User authentication failed!');
        }
    } else if (USE_STORAGE_TYPE === 2 && jokeData.image) {
        const deleteJokeImageResult = await deleteJokeImage(
            {
                jokeId: jokeId,
                userId: userData.id,
            },
            pass,
        );

        switch (deleteJokeImageResult) {
            case 1:
                return returnErrorProps('Failed to delete joke image(s)!');
            case 2:
                return returnErrorProps('User authentication failed!');
        }
    }

    return returnNullProps(0);
};

export const deleteHandler = async (req: Request) => {
    const formData = await req.formData();

    const jokeId = formData.get('jokeId')?.toString() || '';
    const status = formData.get('status')?.toString() || '';

    const name = formData.get('name')?.toString() || '';
    const code = formData.get('code')?.toString() || '';
    const content = formData.get('content')?.toString() || '';

    if (status === 'select') {
        const res = await selectJokeData(jokeId);

        res.req = req;

        return res;
    } else if (status === 'action') {
        const res = await deleteJokeData(jokeId, name, code, content);

        res.req = req;

        return res;
    } else {
        return returnNullProps(3);
    }
};

export const handler = async (_req: Request, _ctx: FreshContext): Promise<Response> => {
    if (!_req) return new Response(null);

    const res = await deleteHandler(_req);

    return new Response(
        JSON.stringify({
            res: res.error ? 1 : 0,
            error: res.error || '',
        }),
        { headers: { 'content-type': 'application/json; charset=utf-8' } },
    );
};
