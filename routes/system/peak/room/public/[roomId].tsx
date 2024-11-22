import { Head } from '$fresh/runtime.ts';
import { Handlers, PageProps } from '$fresh/server.ts';

import Link from '@components/Common/Link.tsx';
import convertTextToElement from '@components/Common/RichText.tsx';
import PostEditor from '@components/Peak/PostEditor.tsx';
import PostViewer from '@components/Peak/PostViewer.tsx';
import { getAllPeakDataByRoomId, peakData, postingTimeIntervalLimit, postPeak } from '@database/peak.ts';
import { getPeakRoomDataById, peakRoomData } from '@database/peakRoom.ts';
import concatWords from '@function/concatWords.ts';
import convertLocalTime from '@function/convertLocalTime.ts';
import getTimeDisplay from '@function/getTimeDisplay.ts';
import Board from '@myBoard';

type getPeakProps = {
    req: Request;
    res: number;
    room?: peakRoomData;
    peak?: peakData[];
};

type postPeakProps = {
    error?: string;
    rec?: {
        name?: string;
        content?: string;
    };
};

type peakProps = {
    roomId: string;
    get?: getPeakProps;
    post?: postPeakProps;
};

/* -----------------------------------------------------------------------------

Response Code:
    0. Successful processing completed.
    1. A clear error occurred.
    2. Failed to retrieve database.

----------------------------------------------------------------------------- */

export const handler: Handlers<peakProps> = {
    async GET(req, ctx) {
        const { roomId } = ctx.params;

        const room = await getPeakRoomDataById(roomId);
        const peak = await getAllPeakDataByRoomId(roomId);

        if (room && peak !== null) {
            return ctx.render({
                roomId: roomId,
                get: {
                    req: req,
                    res: 0,
                    room: room,
                    peak: peak,
                },
            });
        } else {
            return ctx.render({
                roomId: roomId,
                get: {
                    req: req,
                    res: 2,
                },
            });
        }
    },
    async POST(req, ctx) {
        const { roomId } = ctx.params;

        const formData = await req.formData();

        const name = formData.get('name')?.toString();
        const address = ctx.remoteAddr.hostname;
        const pass = formData.get('pass')?.toString();
        const content = formData.get('content')?.toString();

        const returnProps = async (error: string, clear: boolean) => {
            const room = await getPeakRoomDataById(roomId);
            const peak = await getAllPeakDataByRoomId(roomId);

            const post = {
                error: error,
                rec: {
                    name: name,
                    content: !clear ? content : '',
                },
            };

            if (room && peak !== null) {
                return {
                    roomId: roomId,
                    get: {
                        req: req,
                        res: error ? 1 : 0,
                        room: room,
                        peak: peak,
                    },
                    post: post,
                };
            } else {
                return {
                    roomId: roomId,
                    get: {
                        req: req,
                        res: 2,
                    },
                };
            }
        };

        if (!name || !pass || !content) {
            return ctx.render(await returnProps(`Please enter ${concatWords([!name ? 'name' : '', !pass ? 'password' : '', !content ? 'peak' : ''])}!`, false));
        }

        if (name.length > 100) return ctx.render(await returnProps('Please enter a name of 100 characters or less!', false));

        if (pass.length > 100) return ctx.render(await returnProps('Please enter a password of 100 characters or less!', false));

        if (content.length > 1000) return ctx.render(await returnProps('Please enter a content of 1000 characters or less!', false));

        const rec = await postPeak(
            {
                roomId: roomId,
                name: name,
                content: content,
            },
            address,
            pass,
        );

        switch (rec) {
            case 0:
                return ctx.render(await returnProps('', true));
            case 1:
                return ctx.render(await returnProps('Posting failed!', false));
            case 2:
                return ctx.render(await returnProps(`After posting, you need to wait for ${postingTimeIntervalLimit} minute before posting again!`, false));
        }
    },
};

export default function PeakRoom({ data }: PageProps<peakProps>) {
    const req = data.get?.req;
    const path = req && new URL(req.url).pathname;

    const roomId = data.roomId;

    const room = data.get?.room;
    const peak = data.get?.peak;

    const error = data.post?.error;
    const rec = data.post?.rec;

    return (
        <>
            <Head>
                <title>Peak {roomId ? `Room # ${roomId}` : '(Non-Existent Room)'} - Duskectrum</title>
            </Head>

            <Board path={path} type='common' className='document'>
                <>
                    {roomId
                        ? (
                            <>
                                {room && peak
                                    ? (
                                        <>
                                            <h1>{room.title}</h1>

                                            {room.summary && <p>{convertTextToElement(room.summary)}</p>}

                                            <p class='gray_tc'>
                                                Host: {room.hostName}
                                                <br />
                                                Type:{' '}
                                                <b>
                                                    <span class='lime_tc'>Public</span>
                                                </b>
                                            </p>

                                            <div class='content'>
                                                <PostEditor title='Post peak' action='Post' rec={rec} roomId={roomId} content='' error={error} />
                                            </div>

                                            {peak.length !== 0
                                                ? (
                                                    peak.map((peak) => (
                                                        <div class='content'>
                                                            <PostViewer
                                                                peakId={peak.peakId}
                                                                roomId={peak.roomId}
                                                                isPrivate={false}
                                                                name={peak.name}
                                                                sign={peak.sign}
                                                                time={getTimeDisplay(convertLocalTime(new Date(peak.time)))}
                                                                content={peak.content}
                                                            />
                                                        </div>
                                                    ))
                                                )
                                                : <p class='yellow_tc'>Nothing posted...</p>}
                                        </>
                                    )
                                    : (
                                        <>
                                            <h1>Peak Room</h1>

                                            <p class='red_tc'>Failed to retrieve database...</p>

                                            <p>
                                                Go back "<Link href='/system/peak'>Peak</Link>" page.
                                            </p>
                                        </>
                                    )}
                            </>
                        )
                        : (
                            <>
                                <h1>OOPS!</h1>

                                <p>Room does not exist. The URL may contain typos or omissions, or may have been deleted by a room host.</p>

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
