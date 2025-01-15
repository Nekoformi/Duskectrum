import { Head } from '$fresh/runtime.ts';
import { FreshContext, Handlers, PageProps } from '$fresh/server.ts';

import Link from '@components/Common/Link.tsx';
import PostViewer from '@components/Joke/PostViewer.tsx';
import { USE_DATABASE_TYPE } from '@data/dev.ts';
import { getJokeDataById, jokeData } from '@database/joke.ts';
import { getLocalJokeData } from '@database/local/joke.ts';
import { getLocalUserData } from '@database/local/user.ts';
import { testJokeDatabase } from '@database/test/joke.ts';
import { testUserDatabase } from '@database/test/user.ts';
import { getUserDataById, userData } from '@database/user.ts';
import convertLocalTime from '@function/convertLocalTime.ts';
import getTimeDisplay from '@function/getTimeDisplay.ts';
import Board from '@myBoard';

type jokeProps = {
    req: Request;
    res: number;
    userData?: userData;
    jokeData?: jokeData;
};

/* -----------------------------------------------------------------------------

Response Code:
    0. Successful processing completed.
    1. Failed to get joke data.
    2. Failed to get user data.

----------------------------------------------------------------------------- */

const returnNullProps = (req: Request, code: number) => ({
    req: req,
    res: code,
});

const returnJokeProps = async (req: Request, ctx: FreshContext) => {
    const { jokeId } = ctx.params;

    const jokeData = USE_DATABASE_TYPE === 2
        ? await getJokeDataById(jokeId)
        : (USE_DATABASE_TYPE === 1 ? (await getLocalJokeData()) || [] : testJokeDatabase).find((item) => item.jokeId === jokeId);

    if (!jokeData) return ctx.render(returnNullProps(req, 1));

    const userData = USE_DATABASE_TYPE === 2
        ? await getUserDataById(jokeData.userId)
        : (USE_DATABASE_TYPE === 1 ? (await getLocalUserData()) || [] : testUserDatabase).find((item) => item.id === jokeData.userId);

    if (!userData) return ctx.render(returnNullProps(req, 2));

    return ctx.render({
        req: req,
        res: 0,
        userData: userData,
        jokeData: jokeData,
    });
};

export const handler: Handlers<jokeProps> = {
    async GET(req, ctx) {
        return await returnJokeProps(req, ctx);
    },
    async POST(req, ctx) {
        return await returnJokeProps(req, ctx);
    },
};

export default function Joke({ data }: PageProps<jokeProps>) {
    const req = data.req;
    const path = req && new URL(req.url).pathname;

    const userData = data.userData;
    const jokeData = data.jokeData;

    return (
        <>
            <Head>
                <title>View Joke - Duskectrum</title>
            </Head>

            <Board path={path} type='common' className='document'>
                <>
                    <h1>Joke (Tweet System)</h1>

                    {userData && jokeData
                        ? (
                            <div class='content'>
                                <PostViewer
                                    jokeId={jokeData.jokeId}
                                    userId={jokeData.userId}
                                    display={userData.display}
                                    time={getTimeDisplay(convertLocalTime(new Date(jokeData.time)))}
                                    content={jokeData.content}
                                />
                            </div>
                        )
                        : <p class='red_tc'>Failed to retrieve database...</p>}

                    <p>
                        Go back "<Link href='/system/joke'>Joke</Link>" page.
                    </p>
                </>
            </Board>
        </>
    );
}
