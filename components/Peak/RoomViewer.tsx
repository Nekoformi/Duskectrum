import { JSX } from 'preact/jsx-runtime';

import convertTextToElement from '@components/Common/RichText.tsx';
import { getTimeDisplayRes } from '@function/getTimeDisplay.ts';
import Frame, { getFrameHeight } from '@myFrame';

type roomViewerProps = {
    id: string;
    createdAt: getTimeDisplayRes;
    updatedAt: getTimeDisplayRes;
    hostName: string;
    hostSign: string;
    title: string;
    isPrivate: boolean;
    summary: string;
    line?: number;
};

export default function RoomViewer({ id, createdAt, updatedAt, hostName, hostSign, title, isPrivate, summary, line }: roomViewerProps) {
    const frameWrapStyle: JSX.CSSProperties = {
        height: 'auto',
        maxHeight: `calc(${getFrameHeight()}px + 12pt * 1.5 * ${line || 12.5})`,
    };

    return (
        <Frame
            title={`${createdAt.date} ${createdAt.time} | ${hostName}:`}
            frameStyle='card'
            frameType={['setMaximize', 'setFold']}
            wrapStyle={frameWrapStyle}
            className='document'
        >
            <>
                <h2>{title}</h2>

                {summary && <p>{convertTextToElement(summary)}</p>}

                <p class='gray_tc'>
                    Host: {hostName} @ {hostSign}
                    <br />
                    Type: {isPrivate
                        ? (
                            <b>
                                <span class='red_tc'>Private</span>
                            </b>
                        )
                        : (
                            <b>
                                <span class='lime_tc'>Public</span>
                            </b>
                        )}
                    <br />
                    Created at: {createdAt.date} {createdAt.time} {createdAt.timeZone}
                    <br />
                    Updated at: {updatedAt.date} {updatedAt.time} {updatedAt.timeZone}
                </p>

                <div class='content'>
                    <form method='GET' action={`/system/peak/room/${isPrivate ? 'private' : 'public'}/${id}`}>
                        <fieldset>
                            <button>Enter</button>
                        </fieldset>
                    </form>
                </div>

                <div class='content'>
                    <form method='POST' action='?'>
                        <input type='hidden' name='id' value={id} />
                        <input type='hidden' name='status' value='select' />

                        <fieldset class='gray_tc'>
                            <button class='plain' formaction='/system/peak/edit'>
                                EDIT
                            </button>
                            <div class='label'>|</div>
                            <button class='plain' formaction='/system/peak/delete'>
                                DELETE
                            </button>
                        </fieldset>
                    </form>
                </div>
            </>
        </Frame>
    );
}
