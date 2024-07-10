import convertTextToElement from '@components/Common/RichText.tsx';
import { getTimeDisplayRes } from '@function/getTimeDisplay.ts';
import Frame from '@myFrame';

type postViewerProps = {
    peakId: string;
    roomId: string;
    isPrivate: boolean;
    name: string;
    sign: string;
    time: getTimeDisplayRes;
    content: string;
};

export default function PostViewer({ peakId, roomId, isPrivate, name, sign, time, content }: postViewerProps) {
    return (
        <Frame title={`${time.date} ${time.time} | ${name}:`} height='auto' frameStyle='card' frameType={['setMaximize', 'setHide']} className='document'>
            <>
                <p>{convertTextToElement(content)}</p>

                <p class='gray_tc'>
                    Post: {name} @ {sign}
                    <br />
                    Time: {time.date} {time.time} {time.timeZone}
                </p>

                <div class='content'>
                    <form method='POST' action='?'>
                        <input type='hidden' name='peakId' value={peakId} />
                        <input type='hidden' name='roomId' value={roomId} />
                        <input type='hidden' name='status' value='select' />

                        <fieldset class='gray_tc'>
                            <button class='plain' formaction={`/system/peak/post/${isPrivate ? 'private' : 'public'}/edit`}>
                                EDIT
                            </button>
                            <div class='label'>|</div>
                            <button class='plain' formaction={`/system/peak/post/${isPrivate ? 'private' : 'public'}/delete`}>
                                DELETE
                            </button>
                        </fieldset>
                    </form>
                </div>
            </>
        </Frame>
    );
}
