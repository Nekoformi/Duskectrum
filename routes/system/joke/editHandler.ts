import { FreshContext } from '$fresh/server.ts';
import { USE_DATABASE_TYPE, USE_STORAGE_TYPE } from '@data/dev.ts';
import { getJokeDataById, updateJoke } from '@database/joke.ts';
import { convertJokeImageLink, getJokeImageLink, updateJokeImage } from '@database/jokeStorage.ts';
import { getLocalJokeData } from '@database/local/joke.ts';
import { testJokeDatabase } from '@database/test/joke.ts';
import { getUserDataByPass } from '@database/user.ts';
import concatWords from '@function/concatWords.ts';
import getFormArrayData from '@function/getFormArrayData.ts';
import getSha256 from '@function/getSha256.ts';
import { createInitialData, customFileList, customRemoveFileList, registeredFile } from '@islands/Original/Miscellaneous/FileUploader.tsx';

export type updateJokeProps = {
    req?: Request;
    res: number;
    jokeId?: string;
    error?: string;
    rec?: {
        name?: string;
        content?: string;
        initialFileList?: customFileList;
        initialRemoveFileList?: customRemoveFileList;
    };
};

export const returnNullProps = (code: number): updateJokeProps => ({ res: code });

/* -----------------------------------------------------------------------------

Response Code:
    0. Successful processing completed.
    1. A clear error occurred.
    2. Required data does not exist.
    3. An unexpected status specified.
    4. An unexpected handle specified.

----------------------------------------------------------------------------- */

export const selectJokeData = async (jokeId: string): Promise<updateJokeProps> => {
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
            content: jokeData.content,
            initialFileList: jokeImageLink,
            initialRemoveFileList: undefined,
        },
    };
};

export const updateJokeData = async (
    jokeId: string,
    name: string,
    code: string,
    content: string,
    fileList: File[],
    fileMemo: string,
): Promise<updateJokeProps> => {
    const returnErrorProps = (error: string | undefined, registeredFileList?: registeredFile[]) => {
        const { initialFileList, initialRemoveFileList } = createInitialData(fileList, registeredFileList, fileMemo);

        return {
            res: 1,
            jokeId: jokeId,
            error: error,
            rec: {
                name: name,
                content: content,
                initialFileList: initialFileList,
                initialRemoveFileList: initialRemoveFileList,
            },
        };
    };

    if (!jokeId) return returnNullProps(2);

    if (USE_DATABASE_TYPE !== 2) return returnErrorProps('This feature is not available in test / local mode!');

    const jokeData = await getJokeDataById(jokeId);

    if (!jokeData) return returnErrorProps('Failed to get joke!');

    if (USE_STORAGE_TYPE === 2) convertJokeImageLink(jokeData);

    const jokeImage = Array.isArray(jokeData.image) ? jokeData.image : undefined;

    if (!name || !code || !content) {
        return returnErrorProps(`Please enter ${concatWords([!name ? 'name' : '', !code ? 'code' : '', !content ? 'joke' : ''])}!`, jokeImage);
    }

    if (content.length > 1000) return returnErrorProps('Please enter a content of 1000 characters or less!', jokeImage);

    const pass = await getSha256(`${name}+${code}`);

    const userData = await getUserDataByPass(pass, { name: name });

    if (!userData) return returnErrorProps('User authentication failed!', jokeImage);

    const updateJokeResult = await updateJoke(
        {
            jokeId: jokeId,
            userId: userData.id,
            content: content,
        },
        pass,
    );

    if (updateJokeResult !== 0) {
        switch (updateJokeResult) {
            case 1:
                return returnErrorProps('Failed to update joke content!', jokeImage);
            case 2:
                return returnErrorProps('User authentication failed!', jokeImage);
        }
    } else if (USE_STORAGE_TYPE === 2) {
        const updateJokeImageResult = await updateJokeImage(
            {
                jokeId: jokeId,
                userId: userData.id,
            },
            pass,
            fileList,
            fileMemo,
        );

        switch (updateJokeImageResult) {
            case 1:
                return returnErrorProps('Failed to update joke image(s)!', jokeImage);
            case 2:
                return returnErrorProps('User authentication failed!', jokeImage);
        }
    }

    return returnNullProps(0);
};

export const updateHandler = async (req: Request) => {
    const formData = await req.formData();

    const jokeId = formData.get('jokeId')?.toString() || '';
    const status = formData.get('status')?.toString() || '';

    const name = formData.get('name')?.toString() || '';
    const code = formData.get('code')?.toString() || '';
    const content = formData.get('content')?.toString() || '';
    const fileList = (getFormArrayData(formData, 'fileList') as File[]) || [];
    const fileMemo = formData.get('fileMemo')?.toString() || '';

    if (status === 'select') {
        const res = await selectJokeData(jokeId);

        res.req = req;

        return res;
    } else if (status === 'action') {
        const res = await updateJokeData(jokeId, name, code, content, fileList, fileMemo);

        res.req = req;

        return res;
    } else {
        return returnNullProps(3);
    }
};

export const handler = async (_req: Request, _ctx: FreshContext): Promise<Response> => {
    if (!_req) return new Response(null);

    const res = await updateHandler(_req);

    return new Response(
        JSON.stringify({
            res: res.error ? 1 : 0,
            error: res.error || '',
        }),
        { headers: { 'content-type': 'application/json; charset=utf-8' } },
    );
};
