import { Head } from '$fresh/runtime.ts';
import { Handlers, PageProps } from '$fresh/server.ts';

import PostListController from '@components/Joke/PostListController.tsx';
import PostViewer from '@components/Joke/PostViewer.tsx';
import { USE_DATABASE_TYPE } from '@data/dev.ts';
import convertLocalTime from '@function/convertLocalTime.ts';
import getTimeDisplay from '@function/getTimeDisplay.ts';
import PostEditor from '@islands/Joke/PostEditor.tsx';
import Board from '@myBoard';
import { getHandler, jokeProps, postHandler } from './indexHandler.ts';

const DEBUG = false;

export const handler: Handlers<jokeProps> = {
    async GET(req, ctx) {
        return ctx.render(await getHandler(req));
    },
    async POST(req, ctx) {
        return ctx.render(await postHandler(req));
    },
};

export default function Joke({ data }: PageProps<jokeProps>) {
    const req = data.get?.req;
    const path = req && new URL(req.url).pathname;

    const page = data.get?.page;
    const user = data.get?.user;
    const joke = data.get?.joke;

    const error = data.post?.error;
    const rec = data.post?.rec;

    const label = USE_DATABASE_TYPE === 2 ? '' : USE_DATABASE_TYPE === 1 ? 'Local Archive' : 'Local Test';

    return (
        <>
            <Head>
                <title>Joke - Duskectrum</title>
            </Head>

            <Board path={path} type='common' className='document'>
                <>
                    <h1>{label ? `Joke (Tweet System / ${label})` : `Joke (Tweet System)`}</h1>

                    <ul>
                        <li>
                            Allow read:{' '}
                            <b>
                                <span class='lime_tc'>all users</span>
                            </b>
                        </li>
                        <li>
                            Allow post:{' '}
                            <b>
                                <span class='yellow_tc'>limited users</span>
                            </b>
                        </li>
                    </ul>

                    {user && joke
                        ? (
                            <>
                                <div class='content'>
                                    <PostEditor
                                        title='Post joke'
                                        label='Post'
                                        action='/system/joke/indexHandler'
                                        move='/system/joke'
                                        rec={rec}
                                        content=''
                                        error={error}
                                        fold={!DEBUG ? true : false}
                                    />
                                </div>

                                {page && (
                                    <div class='content'>
                                        <PostListController page={page} />
                                    </div>
                                )}

                                {joke.length !== 0
                                    ? (
                                        joke.map((joke) => {
                                            const display = user.find((user) => user.id === joke.userId)?.display || 'Unknown';
                                            const time = getTimeDisplay(convertLocalTime(new Date(joke.time)));

                                            return (
                                                <div class='content'>
                                                    <PostViewer
                                                        jokeId={joke.jokeId}
                                                        userId={joke.userId}
                                                        display={display}
                                                        time={time}
                                                        content={joke.content}
                                                        image={joke.image}
                                                    />
                                                </div>
                                            );
                                        })
                                    )
                                    : <p class='yellow_tc'>Nothing posted...</p>}

                                {page && (
                                    <div class='content'>
                                        <PostListController page={page} />
                                    </div>
                                )}
                            </>
                        )
                        : <p class='red_tc'>Failed to retrieve database...</p>}
                </>
            </Board>
        </>
    );
}
