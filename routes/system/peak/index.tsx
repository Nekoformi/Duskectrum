import { Head } from '$fresh/runtime.ts';
import { Handlers, PageProps } from '$fresh/server.ts';

import RoomEditor from '@components/Peak/RoomEditor.tsx';
import RoomViewer from '@components/Peak/RoomViewer.tsx';
import { createPeakRoom, creatingTimeIntervalLimit, getAllPeakRoomData, peakRoomData } from '@database/peakRoom.ts';
import concatWords from '@function/concatWords.ts';
import convertLocalTime from '@function/convertLocalTime.ts';
import getTimeDisplay from '@function/getTimeDisplay.ts';
import Board from '@myBoard';

type getPeakProps = {
    req: Request;
    res: number;
    room?: peakRoomData[];
};

type postPeakProps = {
    error?: string;
    rec?: {
        hostName?: string;
        title?: string;
        summary?: string;
    };
};

type peakProps = {
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
        const room = await getAllPeakRoomData();

        if (room) {
            return ctx.render({
                get: {
                    req: req,
                    res: 0,
                    room: room,
                },
            });
        } else {
            return ctx.render({
                get: {
                    req: req,
                    res: 2,
                },
            });
        }
    },
    async POST(req, ctx) {
        const formData = await req.formData();

        const hostName = formData.get('hostName')?.toString();
        const hostAddress = ctx.remoteAddr.hostname;
        const hostPass = formData.get('hostPass')?.toString();
        const title = formData.get('title')?.toString();
        const pass = formData.get('pass')?.toString();
        const summary = formData.get('summary')?.toString();

        const returnProps = async (error: string, clear: boolean) => {
            const room = await getAllPeakRoomData();

            const post = {
                error: error,
                rec: {
                    hostName: hostName,
                    title: !clear ? title : '',
                    summary: !clear ? summary : '',
                },
            };

            if (room) {
                return {
                    get: {
                        req: req,
                        res: error ? 1 : 0,
                        room: room,
                    },
                    post: post,
                };
            } else {
                return {
                    get: {
                        req: req,
                        res: 2,
                    },
                    post: post,
                };
            }
        };

        if (!hostName || !hostPass || !title) {
            return ctx.render(
                await returnProps(
                    `Please enter ${concatWords([!hostName ? 'host name' : '', !hostPass ? 'host password' : '', !title ? 'title' : ''])}!`,
                    false,
                ),
            );
        }

        if (hostName.length > 100) return ctx.render(await returnProps('Please enter a host name of 100 characters or less!', false));

        if (hostPass.length > 100) return ctx.render(await returnProps('Please enter a host password of 100 characters or less!', false));

        if (title.length > 100) return ctx.render(await returnProps('Please enter a title of 100 characters or less!', false));

        if (summary && summary.length > 1000) return ctx.render(await returnProps('Please enter a summary of 1000 characters or less!', false));

        const rec = await createPeakRoom(
            {
                hostName: hostName,
                title: title,
                pass: pass,
                summary: summary || '',
            },
            hostAddress,
            hostPass,
        );

        switch (rec) {
            case 0:
                return ctx.render(await returnProps('', true));
            case 1:
                return ctx.render(await returnProps('Creating failed!', false));
            case 2:
                return ctx.render(
                    await returnProps(
                        `If you create a new room immediately after creating one, you will need to wait for ${creatingTimeIntervalLimit} minute!`,
                        false,
                    ),
                );
        }
    },
};

export default function PeakHome({ data }: PageProps<peakProps>) {
    const req = data.get?.req;
    const path = req && new URL(req.url).pathname;

    const room = data.get?.room;

    const error = data.post?.error;
    const rec = data.post?.rec;

    return (
        <>
            <Head>
                <title>Peak - Duskectrum</title>
            </Head>

            <Board path={path} type='common' className='document'>
                <>
                    <h1>Peak (Bulletin Board System)</h1>

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
                                <span class='lime_tc'>all users</span>
                            </b>
                        </li>
                    </ul>

                    {room
                        ? (
                            <>
                                <div class='content'>
                                    <RoomEditor
                                        title='Create peak room'
                                        action='Create'
                                        rec={rec}
                                        input={{ title: '', summary: '' }}
                                        error={error}
                                        fold={true}
                                    />
                                </div>

                                {room.length !== 0
                                    ? (
                                        room.map((room) => {
                                            const createdAt = getTimeDisplay(convertLocalTime(new Date(room.createdAt)));
                                            const updatedAt = getTimeDisplay(convertLocalTime(new Date(room.updatedAt)));

                                            return (
                                                <div class='content'>
                                                    <RoomViewer
                                                        id={room.id}
                                                        createdAt={createdAt}
                                                        updatedAt={updatedAt}
                                                        hostName={room.hostName}
                                                        hostSign={room.hostSign}
                                                        title={room.title}
                                                        isPrivate={room.isPrivate ? true : false}
                                                        summary={room.summary}
                                                    />
                                                </div>
                                            );
                                        })
                                    )
                                    : <p class='yellow_tc'>Lonely space...</p>}
                            </>
                        )
                        : <p class='red_tc'>Failed to retrieve database...</p>}
                </>
            </Board>
        </>
    );
}
