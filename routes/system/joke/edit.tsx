import { Head } from '$fresh/runtime.ts';
import { Handlers, PageProps } from '$fresh/server.ts';

import Link from '@components/Common/Link.tsx';
import PostEditor from '@islands/Joke/PostEditor.tsx';
import Board from '@myBoard';
import { returnNullProps, updateHandler, updateJokeProps } from './editHandler.ts';

export const handler: Handlers<updateJokeProps> = {
    GET(req, ctx) {
        const res = returnNullProps(4);

        res.req = req;

        return ctx.render(res);
    },
    async POST(req, ctx) {
        return ctx.render(await updateHandler(req));
    },
};

export default function EditJoke({ data }: PageProps<updateJokeProps>) {
    const req = data.req;
    const path = req && new URL(req.url).pathname;

    return (
        <>
            <Head>
                <title>Edit Joke - Duskectrum</title>
            </Head>

            <Board path={path} type='common' className='document'>
                <>
                    <h1>Edit Joke</h1>

                    {data.res < 2
                        ? (
                            <div class='content'>
                                <PostEditor
                                    title='Edit joke'
                                    label='Update'
                                    action='/system/joke/editHandler'
                                    move='/system/joke'
                                    rec={data.rec}
                                    jokeId={data.jokeId}
                                    content=''
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
