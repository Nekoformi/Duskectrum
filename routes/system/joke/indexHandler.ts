import { FreshContext } from '$fresh/server.ts';
import { USE_DATABASE_TYPE, USE_STORAGE_TYPE } from '@data/dev.ts';
import { getJokeDataLength, getPartJokeData, jokeData, postJoke } from '@database/joke.ts';
import { convertJokeImageLink, updateJokeImage } from '@database/jokeStorage.ts';
import { getLocalJokeData } from '@database/local/joke.ts';
import { getLocalUserData } from '@database/local/user.ts';
import { testJokeDatabase } from '@database/test/joke.ts';
import { testUserDatabase } from '@database/test/user.ts';
import { getAllUserData, getUserDataByPass, userData } from '@database/user.ts';
import concatWords from '@function/concatWords.ts';
import getFormArrayData from '@function/getFormArrayData.ts';
import getSha256 from '@function/getSha256.ts';
import { createInitialData, customFileList, customRemoveFileList } from '@islands/Original/Miscellaneous/FileUploader.tsx';

const JOKE_PAGE_LENGTH = 10;

export type pageProps = {
    current: number;
    first: number;
    last: number;
};

export type getJokeProps = {
    req?: Request;
    res: number;
    page: pageProps;
    user?: userData[];
    joke?: jokeData[];
};

export type postJokeProps = {
    error?: string;
    rec?: {
        name?: string;
        content?: string;
        initialFileList?: customFileList;
        initialRemoveFileList?: customRemoveFileList;
    };
};

export type jokeProps = {
    get?: getJokeProps;
    post?: postJokeProps;
};

/* -----------------------------------------------------------------------------

Response Code:
    0. Successful processing completed.
    1. A clear error occurred.
    2. Failed to retrieve database.

----------------------------------------------------------------------------- */

const getCurrentPageOffset = (currentPage: number): number => (currentPage > 0 ? JOKE_PAGE_LENGTH * (currentPage - 1) : 0);

const getPage = (currentPage: number, jokeDataLength: number): pageProps => ({
    current: currentPage,
    first: 1,
    last: Math.ceil(jokeDataLength / JOKE_PAGE_LENGTH),
});

export const getJokeData = async (pageNum: number): Promise<getJokeProps> => {
    const jokeData = USE_DATABASE_TYPE === 0 ? testJokeDatabase : USE_DATABASE_TYPE === 1 ? await getLocalJokeData() : [];
    const jokeDataLength = USE_DATABASE_TYPE === 2 ? (await getJokeDataLength()) || 0 : jokeData?.length || 0;

    const page = getPage(pageNum, USE_DATABASE_TYPE === 2 ? jokeDataLength : 0);
    const user = USE_DATABASE_TYPE === 2 ? await getAllUserData() : USE_DATABASE_TYPE === 1 ? await getLocalUserData() : testUserDatabase;
    const joke = USE_DATABASE_TYPE === 2 ? await getPartJokeData(JOKE_PAGE_LENGTH, getCurrentPageOffset(pageNum)) : jokeData;

    if (user && joke) {
        if (USE_STORAGE_TYPE === 2) convertJokeImageLink(joke);

        return {
            res: 0,
            page: page,
            user: user,
            joke: joke,
        };
    } else {
        return {
            res: 2,
            page: page,
        };
    }
};

export const getHandler = async (req: Request): Promise<jokeProps> => {
    const currentPage = Number(new URL(req.url).searchParams.get('p')) || 1;

    const res = await getJokeData(currentPage);

    res.req = req;

    return { get: res };
};

export const postJokeData = async (name: string, code: string, content: string, fileList: File[], fileMemo: string): Promise<postJokeProps> => {
    const returnProps = (error: string | undefined, clear: boolean) => {
        const { initialFileList, initialRemoveFileList } = createInitialData(fileList, [], fileMemo);

        return {
            error: error,
            rec: {
                name: name,
                content: !clear ? content : '',
                initialFileList: !clear ? initialFileList : undefined,
                initialRemoveFileList: !clear ? initialRemoveFileList : undefined,
            },
        };
    };

    if (USE_DATABASE_TYPE !== 2) return returnProps('This feature is not available in test / local mode!', false);

    if (!name || !code || !content) {
        return returnProps(`Please enter ${concatWords([!name ? 'name' : '', !code ? 'code' : '', !content ? 'joke' : ''])}!`, false);
    }

    if (content.length > 1000) return returnProps('Please enter a content of 1000 characters or less!', false);

    const pass = await getSha256(`${name}+${code}`);

    const userData = await getUserDataByPass(pass, { name: name });

    if (!userData) return returnProps('User authentication failed!', false);

    const postJokeResult = await postJoke(
        {
            userId: userData.id,
            content: content,
        },
        pass,
    );

    if (typeof postJokeResult === 'number') {
        switch (postJokeResult) {
            case 1:
                return returnProps('Failed to post joke content!', false);
            case 2:
                return returnProps('User authentication failed!', false);
        }
    } else if (USE_STORAGE_TYPE === 2 && fileMemo) {
        const postJokeImageResult = await updateJokeImage(postJokeResult, pass, fileList, fileMemo);

        switch (postJokeImageResult) {
            case 1:
                return returnProps('Failed to post joke image(s)!', false);
            case 2:
                return returnProps('User authentication failed!', false);
        }
    }

    return returnProps(undefined, true);
};

export const postHandler = async (req: Request, skipGetJokeData?: boolean): Promise<jokeProps> => {
    const formData = await req.formData();

    const name = formData.get('name')?.toString() || '';
    const code = formData.get('code')?.toString() || '';
    const content = formData.get('content')?.toString() || '';
    const fileList = (getFormArrayData(formData, 'fileList') as File[]) || [];
    const fileMemo = formData.get('fileMemo')?.toString() || '';

    const get = !skipGetJokeData ? (await getHandler(req)).get : undefined;
    const post = await postJokeData(name, code, content, fileList, fileMemo);

    return {
        get: get,
        post: post,
    };
};

export const handler = async (_req: Request, _ctx: FreshContext): Promise<Response> => {
    if (!_req) return new Response(null);

    const res = await postHandler(_req, true);

    return new Response(
        JSON.stringify({
            res: res.post?.error ? 1 : 0,
            error: res.post?.error || '',
        }),
        { headers: { 'content-type': 'application/json; charset=utf-8' } },
    );
};
