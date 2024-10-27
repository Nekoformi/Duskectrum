import { Head } from '$fresh/runtime.ts';
import { Handlers, PageProps } from '$fresh/server.ts';

import Link from '@components/Common/Link.tsx';
import RoomEditor from '@components/Peak/RoomEditor.tsx';
import { deletePeakRoom, getPeakRoomDataById } from '@database/peakRoom.ts';
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
        const title = formData.get('targetTitle')?.toString();
        const summary = formData.get('targetSummary')?.toString();

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

            if (!hostPass) return ctx.render(returnErrorProps('Please enter host password!'));

            const rec = await deletePeakRoom(
                {
                    id: id,
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
                    return ctx.render(returnErrorProps('Deleting failed!'));
            }
        } else {
            return ctx.render(returnNullProps(req, 3));
        }
    },
};

export default function DeletePeakRoom({ data }: PageProps<peakProps>) {
    const req = data.req;
    const path = req && new URL(req.url).pathname;

    return (
        <>
            <Head>
                <title>Delete Peak Room - Duskectrum</title>
            </Head>

            <Board path={path} type='common' className='document'>
                <>
                    <h1>Delete Peak Room</h1>

                    {data.res < 2
                        ? (
                            <div class='content'>
                                <RoomEditor
                                    title='Delete peak room'
                                    action='Delete'
                                    rec={data.rec}
                                    id={data.id}
                                    target={{ title: data.rec?.title || 'Unknown', summary: data.rec?.summary || '' }}
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
