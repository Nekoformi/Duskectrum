import convertTextToElement from '@components/Common/RichText.tsx';
import { USE_STORAGE_TYPE } from '@data/dev.ts';
import { createFormDataFromFormElement } from '@function/getFormDataFromFormElement.ts';
import toggleFormAllControllerElement from '@function/toggleFormAllControllerElement.ts';
import FileUploader, { customFileList, customRemoveFileList } from '@islands/Original/Miscellaneous/FileUploader.tsx';
import Frame from '@myFrame';
import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';

type postDataRes = {
    res: number;
    error: string;
};

const postData = async (event: Event, action: string): Promise<postDataRes | null> => {
    event.preventDefault();

    const form = event.target as HTMLElement;

    const formData = createFormDataFromFormElement(form, [
        {
            name: 'jokeId',
            type: 'value',
        },
        {
            name: 'status',
            type: 'value',
        },
        {
            name: 'name',
            type: 'value',
        },
        {
            name: 'code',
            type: 'value',
        },
        {
            name: 'content',
            type: 'value',
        },
        {
            name: 'fileList',
            type: 'fileArray',
        },
        {
            name: 'fileMemo',
            type: 'value',
        },
    ]);

    const res = await fetch(action, {
        method: 'POST',
        body: formData,
    });

    if (res.status === 200) {
        return JSON.parse(await res.text()) as postDataRes;
    } else {
        return null;
    }
};

type postEditorProps = {
    title: string;
    label: string;
    action?: string;
    move?: string;
    rec?: {
        name?: string;
        content?: string;
        initialFileList?: customFileList;
        initialRemoveFileList?: customRemoveFileList;
    };
    jokeId?: string;
    target?: string;
    content?: string;
    error?: string;
    fold?: boolean;
};

export default function PostEditor({ title, label, action, move, rec, jokeId, target, content, error, fold }: postEditorProps) {
    const errorMessage = useSignal('');

    useEffect(() => {
        errorMessage.value = error || '';
    }, [error]);

    const ErrorMessage = (): JSX.Element => {
        return errorMessage.value ? <p class='red_tc'>{errorMessage.value}</p> : <></>;
    };

    return (
        <Frame title={title} height='auto' frameStyle='card' frameType={['setMaximize', !error && fold ? 'fold' : '', 'setFold']} className='document'>
            <>
                <ErrorMessage />

                <div class='content'>
                    <form
                        method='POST'
                        enctype='multipart/form-data'
                        onSubmit={async (e) => {
                            if (!action) return;

                            toggleFormAllControllerElement(e.target as HTMLElement, true);

                            const res = await postData(e, action);

                            if (res === null) {
                                errorMessage.value = 'Failed to connect server!';
                            } else if (res.error) {
                                errorMessage.value = res.error;
                            } else {
                                errorMessage.value = '';

                                if (move) {
                                    window.location.href = move;

                                    return;
                                }
                            }

                            toggleFormAllControllerElement(e.target as HTMLElement, false);
                        }}
                    >
                        <input type='hidden' name='jokeId' value={jokeId} />
                        <input type='hidden' name='status' value='action' />

                        <fieldset style={{ marginTop: '0' }}>
                            <div>
                                <div class='label'>Name:</div>
                                <input type='text' name='name' placeholder='Your name' value={rec?.name} />
                            </div>
                            <div>
                                <div class='label'>Code:</div>
                                <input type='password' name='code' placeholder='Your code' />
                            </div>
                        </fieldset>

                        <p class='yellow_tc'>This operation requires a registered name and code!</p>

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
                            <>
                                <fieldset>
                                    <div class='label'>Joke:</div>
                                    <textarea name='content' value={rec?.content || content}></textarea>
                                </fieldset>

                                {USE_STORAGE_TYPE === 2 && (
                                    <FileUploader
                                        initialFileList={rec?.initialFileList}
                                        initialRemoveFileList={rec?.initialRemoveFileList}
                                        type='image/png, image/jpeg'
                                        max={5}
                                    />
                                )}
                            </>
                        )}

                        <fieldset>
                            <button type='submit'>{label}</button>
                        </fieldset>
                    </form>
                </div>
            </>
        </Frame>
    );
}
