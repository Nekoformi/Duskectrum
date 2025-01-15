import specialSplitString from '@function/specialSplitString.ts';
import { useSignal } from '@preact/signals';
import { useEffect, useState } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';

const IMAGE_EXTENSIONS = /^.*\.(jpg|JPG|png|PNG|bmp|BMP|gif|GIF)$/;

export type registeredFile = {
    id: string;
    url: string;
};

export type customFileList = (registeredFile | File)[];
export type customRemoveFileList = registeredFile[];

export const isRegisteredFileType = (arg: unknown): arg is registeredFile => {
    return typeof arg === 'object' && arg !== null && typeof (arg as registeredFile).id === 'string' && typeof (arg as registeredFile).url === 'string';
};

export const isRegisteredFileArrayType = (arg: unknown): arg is registeredFile[] => {
    return Array.isArray(arg) && arg.every((item) => isRegisteredFileType(item));
};

export type fileRecipeItem = {
    status: number;
    content?: string;
    file?: File;
};

/* -----------------------------------------------------------------------------

File Memo Code:
    0. An unchanged file.
    1. Files to add.
    2. Files to delete.

----------------------------------------------------------------------------- */

const convertFileMemoToFileRecipe = (memo: string): fileRecipeItem[] => {
    const sss = (text: string, split: string) => specialSplitString(text, split, '"', '"');

    return sss(memo, ',').map((item) => {
        const rec = sss(item, ':');

        if (rec && rec.length === 2) {
            return {
                status: Number(rec[0]),
                content: rec[1],
            };
        } else {
            return { status: -1 };
        }
    });
};

export const createFileRecipe = (fileList: File[], fileMemo: string): fileRecipeItem[] => {
    const fileRecipe = convertFileMemoToFileRecipe(fileMemo);

    if (!fileRecipe) return [];

    let fileListBuffer = [...fileList];

    fileRecipe.forEach((item) => {
        if (item.status !== 1) return;

        const target = fileListBuffer.find((file) => file.name === item.content);

        if (target) {
            item.file = target;

            fileListBuffer = fileListBuffer.filter((file) => file !== target);
        } else {
            item = { status: -1 };
        }
    });

    return fileRecipe;
};

export const createInitialData = (
    newFileList: File[] | undefined,
    registeredFileList: registeredFile[] | undefined,
    fileMemo: string,
): {
    initialFileList: customFileList | undefined;
    initialRemoveFileList: customRemoveFileList | undefined;
} => {
    const fileRecipe = createFileRecipe(newFileList || [], fileMemo);

    const initialFileList = fileRecipe
        .map((item) => {
            switch (item.status) {
                case 0:
                    if (registeredFileList) {
                        const res = registeredFileList.find((file) => file.id === item.content);

                        if (res) return res;
                    }
                    break;
                case 1:
                    return item.file;
            }
        })
        .filter((item) => item !== undefined) as customFileList;

    const initialRemoveFileList = fileRecipe
        .map((item) => {
            switch (item.status) {
                case 2:
                    if (registeredFileList) {
                        const res = registeredFileList.find((file) => file.id === item.content);

                        if (res) return res;
                    }
                    break;
            }
        })
        .filter((item) => item !== undefined) as customRemoveFileList;

    return {
        initialFileList: initialFileList,
        initialRemoveFileList: initialRemoveFileList,
    };
};

type fileUploaderProps = {
    initialFileList?: FileList | customFileList;
    initialRemoveFileList?: customRemoveFileList;
    type?: string;
    max?: number;
    hideFileListField?: boolean;
    hideFileImageField?: boolean;
};

export default function FileUploader({ initialFileList, initialRemoveFileList, type, max, hideFileListField, hideFileImageField }: fileUploaderProps) {
    const [fileList, setFileList] = useState<customFileList>([]); // useSignal<customFileList>([]);
    const [removeFileList, setRemoveFileList] = useState<customRemoveFileList>([]); // useSignal<customRemoveFileList>([]);

    const allowType = type ? type.split(',').map((item) => item.trim()) : undefined;
    const isMaxFileNum = useSignal(false);

    useEffect(() => {
        if (initialFileList) setFileList([...initialFileList]);
        if (initialRemoveFileList) setRemoveFileList([...initialRemoveFileList]);
    }, [initialFileList, initialRemoveFileList]);

    useEffect(() => {
        isMaxFileNum.value = max !== undefined && fileList.length >= max;
    }, [fileList]);

    const addFiles = (newFileList: FileList | null) => {
        if (!newFileList) return;

        setFileList(fileList.concat([...newFileList].filter((file) => !allowType || allowType.includes(file.type))).slice(0, max));
    };

    const removeFile = (index: number) => {
        const target = fileList[index];

        if (isRegisteredFileType(target)) setRemoveFileList(removeFileList.concat([target]));

        setFileList(fileList.filter((file) => file !== target));
    };

    const extractNewFiles = (): FileList | null => {
        if (fileList.length === 0) return null;

        const res = new DataTransfer();

        fileList.forEach((file) => !isRegisteredFileType(file) && res.items.add(file));

        return res.files;
    };

    const moveFileList = (index: number, move: number) => {
        if (index < 0 || index >= fileList.length || index + move < 0 || index + move >= fileList.length) return;

        const target = fileList[index];

        const newFileList = [...fileList].filter((file) => file !== target);

        newFileList.splice(index + move, 0, target);

        setFileList(newFileList);
    };

    const storeFileInFileList = (file: File): FileList => {
        const res = new DataTransfer();

        res.items.add(file);

        return res.files;
    };

    const generateFileMemo = (): string => {
        const memoA = fileList.map((file) => (isRegisteredFileType(file) ? `0:"${file.id}"` : `1:"${file.name}"`));
        const memoB = removeFileList.map((file) => `2:"${file.id}"`);

        return ([] as string[]).concat(memoA, memoB).join(',');
    };

    const dropHandler = (e: DragEvent) => {
        e.preventDefault();

        if (!e || !e.dataTransfer) return;

        if (e.dataTransfer.items) {
            const rec = new DataTransfer();

            [...e.dataTransfer.items].forEach((item) => {
                const file = item.kind === 'file' ? item.getAsFile() : null;

                file && rec.items.add(file);
            });

            addFiles(rec.files);
        } else {
            addFiles(e.dataTransfer.files);
        }
    };

    const dragOverHandler = (e: DragEvent) => {
        e.preventDefault();
    };

    const imageStyle: JSX.CSSProperties = {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '180px',
        height: '180px',
        padding: '1px',
        wordBreak: 'break-all',
        border: 'solid 1px #888',
    };

    const imageButtonContainerStyle: JSX.CSSProperties = {
        position: 'absolute',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        top: '1px',
        right: '1px',
        margin: '0',
        gap: '1px',
    };

    const imageButtonStyle: JSX.CSSProperties = {
        padding: '4px',
        lineHeight: '1',
        color: '#ccc',
        backgroundColor: '#888c',
    };

    const FileListField = (): JSX.Element => (
        <>
            <fieldset class='col'>
                <div class='label'>Files{max && ` (${fileList.length} / ${max})`}:</div>
                <label class={!isMaxFileNum.value ? 'button' : 'button disabled'} onDrop={(e) => dropHandler(e)} onDragOver={(e) => dragOverHandler(e)}>
                    <input
                        class='hidden'
                        type='file'
                        accept={type}
                        multiple
                        onChange={(e) => {
                            addFiles(e.currentTarget.files);

                            e.currentTarget.value = '';
                        }}
                        disabled={isMaxFileNum.value}
                    />
                    <div>Add files...</div>
                </label>
            </fieldset>

            <ul>
                {fileList.map((file, index) => (
                    <li>
                        <fieldset class='inline gray_tc'>
                            <button class='plain' type='button' onClick={() => moveFileList(index, -1)}>
                                [&lt;]
                            </button>
                            <button class='plain' type='button' onClick={() => moveFileList(index, +1)}>
                                [&gt;]
                            </button>
                            <button class='plain' type='button' onClick={() => removeFile(index)}>
                                [X]
                            </button>
                        </fieldset>{' '}
                        {isRegisteredFileType(file) ? file.id : file.name}
                    </li>
                ))}
            </ul>
        </>
    );

    const FileImageField = (): JSX.Element => (
        <fieldset>
            <div class='gallery'>
                {fileList.map((file, index) => {
                    const filePath = isRegisteredFileType(file) ? file.url : file.name;
                    const fileName = isRegisteredFileType(file) ? file.id /* file.url.replace(/^.*[\\\/]/, '') */ : file.name;

                    return (
                        <div style={imageStyle}>
                            {filePath.toLocaleLowerCase().match(IMAGE_EXTENSIONS)
                                ? <img src={isRegisteredFileType(file) ? file.url : URL.createObjectURL(file)} />
                                : <div>{fileName}</div>}
                            <fieldset style={imageButtonContainerStyle}>
                                <button class='plain' type='button' style={imageButtonStyle} onClick={() => moveFileList(index, -1)}>
                                    ←
                                </button>
                                <button class='plain' type='button' style={imageButtonStyle} onClick={() => moveFileList(index, +1)}>
                                    →
                                </button>
                                <button class='plain' type='button' style={imageButtonStyle} onClick={() => removeFile(index)}>
                                    ×
                                </button>
                            </fieldset>
                        </div>
                    );
                })}
                {!isMaxFileNum.value && (
                    <label
                        style={Object.assign({ cursor: 'pointer' }, imageStyle)}
                        onDrop={(e) => dropHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                    >
                        <input
                            class='hidden'
                            type='file'
                            accept={type}
                            multiple
                            onChange={(e) => {
                                addFiles(e.currentTarget.files);

                                e.currentTarget.value = '';
                            }}
                            disabled={isMaxFileNum.value}
                        />
                        <div>Add files...</div>
                    </label>
                )}
            </div>
        </fieldset>
    );

    const FileStore = (): JSX.Element => {
        const newFiles = extractNewFiles();

        return (
            <>
                {newFiles &&
                    [...newFiles].map((file, index) => (
                        /* @ts-expect-error */
                        <input class='hidden' type='file' name={`fileList[${index}]`} files={storeFileInFileList(file)} />
                    ))}

                <input type='hidden' name='fileMemo' value={generateFileMemo()} />
            </>
        );
    };

    return (
        <>
            {!hideFileListField && <FileListField />}
            {!hideFileImageField && <FileImageField />}

            <FileStore />
        </>
    );
}
