import convertTextToElement from '@components/Common/RichText.tsx';
import Frame from '@myFrame';

type roomEditorProps = {
    title: string;
    action: string;
    rec?: {
        hostName?: string;
        title?: string;
        summary?: string;
    };
    id?: string;
    target?: {
        title: string;
        summary: string;
    };
    input?: {
        title: string;
        summary: string;
    };
    error?: string;
    fold?: boolean;
};

export default function RoomEditor({ title, action, rec, id, target, input, error, fold }: roomEditorProps) {
    return (
        <Frame title={title} height='auto' frameStyle='card' frameType={['setMaximize', !error && fold ? 'fold' : '', 'setFold']} className='document'>
            <>
                {error && <p class='red_tc'>{error}</p>}

                <div class='content'>
                    <form method='POST' onSubmit={() => false}>
                        <h2>Host</h2>

                        <input type='hidden' name='id' value={id} />
                        <input type='hidden' name='status' value='action' />

                        {id
                            ? (
                                <>
                                    <fieldset>
                                        <div>
                                            <div class='label'>Password:</div>
                                            <input name='hostPass' type='password' placeholder='Host password' />
                                        </div>
                                    </fieldset>

                                    <p class='yellow_tc'>This operation requires the host password!</p>
                                </>
                            )
                            : (
                                <>
                                    <fieldset>
                                        <div>
                                            <div class='label'>Name:</div>
                                            <input name='hostName' type='text' placeholder='Your name' value={rec?.hostName} />
                                        </div>
                                        <div>
                                            <div class='label'>Password:</div>
                                            <input name='hostPass' type='password' placeholder='Host password' />
                                        </div>
                                    </fieldset>

                                    <p class='yellow_tc'>These items can not be changed later!</p>
                                </>
                            )}

                        <h2>Room</h2>

                        {target && (
                            <fieldset>
                                <input type='hidden' name='targetTitle' value={target.title} />
                                <input type='hidden' name='targetSummary' value={target.summary} />

                                <div class='label'>Target:</div>
                                <blockquote>
                                    <h2>{target.title}</h2>

                                    {target.summary && <p>{convertTextToElement(target.summary)}</p>}
                                </blockquote>
                            </fieldset>
                        )}

                        {input && (
                            <>
                                <fieldset>
                                    <div>
                                        <div class='label'>Title:</div>
                                        <input name='title' type='text' placeholder='Room title' value={rec?.title || input.title} />
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <div class='label'>Summary (Option):</div>
                                    <textarea name='summary' value={rec?.summary || input.summary}></textarea>
                                </fieldset>

                                {
                                    /* !id && (
                                        <>
                                            <fieldset>
                                                <div>
                                                    <div class='label'>Password (Option): </div>
                                                    <input name='pass' type='password' placeholder='Room password' />
                                                </div>
                                            </fieldset>

                                            <p class='yellow_tc'>
                                                {'Room password === "" ? '}
                                                <b>
                                                    <span class='lime_tc'>Public</span>
                                                </b>
                                                {' : '}
                                                <b>
                                                    <span class='red_tc'>Private</span>
                                                </b>
                                            </p>

                                            <p class='yellow_tc'>Room password can not be changed later! All messages are encrypted based on the password!</p>
                                        </>
                                    ) */
                                }
                            </>
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
