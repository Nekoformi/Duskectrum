import { Head } from '$fresh/runtime.ts';
import { Handlers, PageProps } from '$fresh/server.ts';

import Link from '@components/Common/Link.tsx';
import RoomEditor from '@components/Peak/RoomEditor.tsx';
import { getPeakRoomDataById, updatePeakRoom } from '@database/peakRoom.ts';
import concatWords from '@function/concatWords.ts';
import Board from '@myBoard';

type peakProps = {
    req: Request;
    res: number;
    id?: string;
    error?: string;
    rec?: {
        title?: string;
        summary?: string;
    };
};

const returnNullProps = (req: Request, code: number) => ({
    req: req,
    res: code,
});

/* -----------------------------------------------------------------------------

Response Code:
    0. Successful processing completed.
    1. A clear error occurred.
    2. Required data does not exist.
    3. An unexpected status specified.
    4. An unexpected handle specified.

----------------------------------------------------------------------------- */

export const handler: Handlers<peakProps> = {
    GET(req, ctx) {
        return ctx.render(returnNullProps(req, 4));
    },
    async POST(req, ctx) {
        const formData = await req.formData();

        const id = formData.get('id')?.toString();
        const status = formData.get('status')?.toString();

        const hostPass = formData.get('hostPass')?.toString();
        const title = formData.get('title')?.toString();
        const summary = formData.get('summary')?.toString();

        const returnErrorProps = (error: string) => {
            return {
                req: req,
                res: 1,
                id: id,
                error: error,
                rec: {
                    title: title,
                    summary: summary,
                },
            };
        };

        if (status === 'select') {
            if (!id) return ctx.render(returnNullProps(req, 2));

            const roomData = await getPeakRoomDataById(id);

            if (!roomData) return ctx.render(returnErrorProps('System error!'));

            return ctx.render({
                req: req,
                res: 0,
                id: id,
                rec: {
                    title: roomData.title,
                    summary: roomData.summary,
                },
            });
        } else if (status === 'action') {
            if (!id) return ctx.render(returnNullProps(req, 2));

            if (!hostPass || !title) {
                return ctx.render(returnErrorProps(`Please enter ${concatWords([!hostPass ? 'host password' : '', !title ? 'title' : ''])}!`));
            }

            if (title.length > 100) return ctx.render(returnErrorProps('Please enter a title of 100 characters or less!'));

            if (summary && summary.length > 1000) return ctx.render(returnErrorProps('Please enter a summary of 1000 characters or less!'));

            const rec = await updatePeakRoom(
                {
                    id: id,
                    title: title,
                    summary: summary || '',
                },
                hostPass,
            );

            switch (rec) {
                case 0:
                    return new Response('', {
                        status: 303,
                        headers: {
                            Location: '/system/peak',
                        },
                    });
                case 1:
                    return ctx.render(returnErrorProps('Updating failed!'));
            }
        } else {
            return ctx.render(returnNullProps(req, 3));
        }
    },
};

export default function EditPeakRoom({ data }: PageProps<peakProps>) {
    const req = data.req;
    const path = req && new URL(req.url).pathname;

    return (
        <>
            <Head>
                <title>Edit Peak Room - Duskectrum</title>
            </Head>

            <Board path={path} type='common' className='document'>
                <>
                    <h1>Edit Peak Room</h1>

                    {data.res < 2
                        ? (
                            <div class='content'>
                                <RoomEditor
                                    title='Edit peak room'
                                    action='Update'
                                    rec={data.rec}
                                    id={data.id}
                                    input={{ title: '', summary: '' }}
                                    error={data.error}
                                />
                            </div>
                        )
                        : <p class='red_tc'>Unauthorized operation!</p>}

                    <p>
                        Go back "<Link href='/system/peak'>Peak</Link>" page.
                    </p>
                </>
            </Board>
        </>
    );
}
