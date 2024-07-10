import { Head } from '$fresh/runtime.ts';
import { Handlers, PageProps } from '$fresh/server.ts';

import Link from '@components/Common/Link.tsx';
import PostEditor from '@components/Peak/PostEditor.tsx';
import { deletePeak, getPeakDataByPeakId } from '@database/peak.ts';
import Board from '@myBoard';

type peakProps = {
    req: Request;
    res: number;
    peakId?: string;
    roomId?: string;
    error?: string;
    rec?: {
        content?: string;
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

        const peakId = formData.get('peakId')?.toString();
        const roomId = formData.get('roomId')?.toString();
        const status = formData.get('status')?.toString();

        const pass = formData.get('pass')?.toString();
        const content = formData.get('target')?.toString();

        const returnErrorProps = (error: string) => {
            return {
                req: req,
                res: 1,
                peakId: peakId,
                roomId: roomId,
                error: error,
                rec: {
                    content: content,
                },
            };
        };

        if (status === 'select') {
            if (!peakId || !roomId) return ctx.render(returnNullProps(req, 2));

            const peakData = await getPeakDataByPeakId(peakId);

            if (!peakData) return ctx.render(returnErrorProps('System error!'));

            return ctx.render({
                req: req,
                res: 0,
                peakId: peakId,
                roomId: roomId,
                rec: {
                    content: peakData.content,
                },
            });
        } else if (status === 'action') {
            if (!peakId || !roomId) return ctx.render(returnNullProps(req, 2));

            if (!pass) return ctx.render(returnErrorProps('Please enter password!'));

            const rec = await deletePeak(
                {
                    peakId: peakId,
                    roomId: roomId,
                },
                pass,
            );

            switch (rec) {
                case 0:
                    return new Response('', {
                        status: 303,
                        headers: {
                            Location: `/system/peak/room/public/${roomId}`,
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

export default function DeletePeak({ data }: PageProps<peakProps>) {
    const req = data.req;
    const path = req && new URL(req.url).pathname;

    return (
        <>
            <Head>
                <title>Delete Peak - Duskectrum</title>
            </Head>

            <Board path={path} type='common' className='document'>
                <>
                    <h1>Delete Peak</h1>

                    {data.res < 2
                        ? (
                            <>
                                <div class='content'>
                                    <PostEditor
                                        title='Delete peak'
                                        action='Delete'
                                        rec={data.rec}
                                        peakId={data.peakId}
                                        roomId={data.roomId}
                                        target={data.rec?.content}
                                        error={data.error}
                                    />
                                </div>

                                <p>
                                    Go back "<Link href={`/system/peak/room/public/${data.roomId}`}>Peak Room</Link>" page.
                                </p>
                            </>
                        )
                        : (
                            <>
                                <p class='red_tc'>Unauthorized operation!</p>

                                <p>
                                    Go back "<Link href='/system/peak'>Peak</Link>" page.
                                </p>
                            </>
                        )}
                </>
            </Board>
        </>
    );
}
