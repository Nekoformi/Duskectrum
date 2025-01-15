import PixelatedImage from '@components/Common/PixelatedImage.tsx';
import convertTextToElement from '@components/Common/RichText.tsx';
import { USE_STORAGE_TYPE } from '@data/dev.ts';
import { profileData } from '@data/profile.ts';
import { getTimeDisplayRes } from '@function/getTimeDisplay.ts';
import { registeredFile } from '@islands/Original/Miscellaneous/FileUploader.tsx';
import Frame from '@myFrame';
import { JSX } from 'preact/jsx-runtime';

const portraitImageSize = 48; // px

type postViewerProps = {
    jokeId: string;
    userId: string;
    display: string;
    time: getTimeDisplayRes;
    content: string;
    image?: string | registeredFile[] | null;
};

export default function PostViewer({ jokeId, userId, display, time, content, image }: postViewerProps) {
    const portrait = profileData.find((item) => item.id === userId)?.portraitImagePath;

    const Image = (): JSX.Element => {
        const ImageFrame = ({ item }: { item: registeredFile }) => {
            const title = item ? item.id : 'NULL';

            return (
                <Frame
                    title={title}
                    width=''
                    height='auto'
                    frameStyle='box'
                    frameType={['setMaximize', 'setHide']}
                    className='document'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {item ? <PixelatedImage src={item.url} width={640} height={640} /> : <p class='red_tc'>Failed to get image.</p>}
                </Frame>
            );
        };

        if (image === null) {
            return <p class='red_tc'>Failed to get image(s).</p>;
        } else if (Array.isArray(image) && image.length !== 0) {
            if (image.length === 1) {
                return (
                    <div class='content'>
                        <ImageFrame item={image[0]} />
                    </div>
                );
            } else {
                return (
                    <div class='gallery'>
                        {image.map((item) => <ImageFrame item={item} />)}
                    </div>
                );
            }
        } else {
            return <></>;
        }
    };

    const LocalImage = (): JSX.Element => {
        const LocalImageFrame = ({ item }: { item: string }) => {
            const title = item || 'NULL';

            return (
                <Frame
                    title={title}
                    width=''
                    height='auto'
                    frameStyle='box'
                    frameType={['setMaximize', 'setHide']}
                    className='document'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {item
                        ? <PixelatedImage src={`/system/joke/${userId}/${jokeId}/${item}`} width={640} height={640} />
                        : <p class='red_tc'>Failed to get image.</p>}
                </Frame>
            );
        };

        if (image && !Array.isArray(image)) {
            const list = image.split(',');

            if (list.length === 1) {
                return (
                    <div class='content'>
                        <LocalImageFrame item={list[0]} />
                    </div>
                );
            } else {
                return (
                    <div class='gallery'>
                        {list.map((item) => <LocalImageFrame item={item} />)}
                    </div>
                );
            }
        } else {
            return <></>;
        }
    };

    return (
        <Frame title={`${time.date} ${time.time} | ${display}:`} height='auto' frameStyle='card' frameType={['setMaximize', 'setHide']} className='document'>
            <>
                {USE_STORAGE_TYPE === 2 ? <Image /> : USE_STORAGE_TYPE === 1 ? <LocalImage /> : <></>}

                <p>{convertTextToElement(content)}</p>

                <div class='content flex'>
                    {portrait && (
                        <div class='mr-4'>
                            <PixelatedImage src={portrait} width={portraitImageSize} height={portraitImageSize} style={{ borderRadius: '50%' }} />
                        </div>
                    )}
                    <div>
                        <p class='gray_tc'>
                            Post: {display}
                            <br />
                            Time: {time.date} {time.time} {time.timeZone}
                        </p>
                    </div>
                </div>

                <div class='content'>
                    <form method='POST' action='?'>
                        <input type='hidden' name='jokeId' value={jokeId} />
                        <input type='hidden' name='status' value='select' />

                        <fieldset class='gray_tc'>
                            <a class='button plain' href={`/system/joke/post/${jokeId}`}>
                                VIEW
                            </a>
                            <div class='label'>|</div>
                            <button class='plain' formaction='/system/joke/edit'>
                                EDIT
                            </button>
                            <div class='label'>|</div>
                            <button class='plain' formaction='/system/joke/delete'>
                                DELETE
                            </button>
                        </fieldset>
                    </form>
                </div>
            </>
        </Frame>
    );
}
