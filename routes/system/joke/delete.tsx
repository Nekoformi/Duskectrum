import { Head } from '$fresh/runtime.ts';
import { Handlers, PageProps } from '$fresh/server.ts';

import Link from '@components/Common/Link.tsx';
import PostEditor from '@islands/Joke/PostEditor.tsx';
import Board from '@myBoard';
import { deleteHandler, deleteJokeProps, returnNullProps } from './deleteHandler.ts';

export const handler: Handlers<deleteJokeProps> = {
    GET(req, ctx) {
        const res = returnNullProps(4);

        res.req = req;

        return ctx.render(res);
    },
    async POST(req, ctx) {
        return ctx.render(await deleteHandler(req));
    },
};

export default function DeleteJoke({ data }: PageProps<deleteJokeProps>) {
    const req = data.req;
    const path = req && new URL(req.url).pathname;

    return (
        <>
            <Head>
                <title>Delete Joke - Duskectrum</title>
            </Head>

            <Board path={path} type='common' className='document'>
                <>
                    <h1>Delete Joke</h1>

                    {data.res < 2
                        ? (
                            <div class='content'>
                                <PostEditor
                                    title='Delete joke'
                                    label='Delete'
                                    action='/system/joke/deleteHandler'
                                    move='/system/joke'
                                    rec={data.rec}
                                    jokeId={data.jokeId}
                                    target={data.rec?.content}
                                    error={data.error}
                                />
                            </div>
                        )
                        : <p class='red_tc'>Unauthorized operation!</p>}

                    <p>
                        Go back "<Link href='/system/joke'>Joke</Link>" page.
                    </p>
                </>
            </Board>
        </>
    );
}
