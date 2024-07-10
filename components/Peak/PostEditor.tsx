import convertTextToElement from '@components/Common/RichText.tsx';
import Frame from '@myFrame';

type postEditorProps = {
    title: string;
    action: string;
    rec?: {
        name?: string;
        content?: string;
    };
    peakId?: string;
    roomId?: string;
    target?: string;
    content?: string;
    error?: string;
    fold?: boolean;
};

export default function PostEditor({ title, action, rec, peakId, roomId, target, content, error, fold }: postEditorProps) {
    return (
        <Frame title={title} height='auto' frameStyle='card' frameType={['setMaximize', !error && fold ? 'fold' : '', 'setFold']} className='document'>
            <>
                {error && <p class='red_tc'>{error}</p>}

                <div class='content'>
                    <form method='POST' onSubmit={() => false}>
                        <input type='hidden' name='peakId' value={peakId} />
                        <input type='hidden' name='roomId' value={roomId} />
                        <input type='hidden' name='status' value='action' />

                        {peakId
                            ? (
                                <>
                                    <fieldset>
                                        <div>
                                            <div class='label'>Password:</div>
                                            <input name='pass' type='password' placeholder='Your password' />
                                        </div>
                                    </fieldset>

                                    <p class='yellow_tc'>This operation requires a registered password!</p>
                                </>
                            )
                            : (
                                <>
                                    <fieldset>
                                        <div>
                                            <div class='label'>Name:</div>
                                            <input name='name' type='text' placeholder='Your name' value={rec?.name} />
                                        </div>
                                        <div>
                                            <div class='label'>Password:</div>
                                            <input name='pass' type='password' placeholder='Your password' />
                                        </div>
                                    </fieldset>

                                    <p class='yellow_tc'>Your name and password can not be changed later!</p>
                                </>
                            )}

                        {typeof target === 'string' && (
                            <fieldset>
                                <input type='hidden' name='target' value={target} />

                                <div class='label'>Target:</div>
                                <blockquote>
                                    <p>{convertTextToElement(target)}</p>
                                </blockquote>
                            </fieldset>
                        )}

                        {typeof content === 'string' && (
                            <fieldset>
                                <div class='label'>Peak:</div>
                                <textarea name='content' value={rec?.content || content}></textarea>
                            </fieldset>
                        )}

                        <fieldset>
                            <button type='submit'>{action}</button>
                        </fieldset>
                    </form>
                </div>
            </>
        </Frame>
    );
}
