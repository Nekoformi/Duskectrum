import { JSX } from 'preact/jsx-runtime';

type pixelatedImageProps = {
    src: string;
    title?: string;
    caption?: string;
    width?: number;
    height?: number;
    style?: JSX.CSSProperties;
};

export default function PixelatedImage({ src, title, caption, width, height, style }: pixelatedImageProps): JSX.Element {
    const imageStyle: JSX.CSSProperties = {
        width: '100%',
        height: '100%',
        maxWidth: width ? `${width}px` : 'auto',
        maxHeight: height ? `${height}px` : 'auto',
    };

    if (style) Object.assign(imageStyle, style);

    return (
        <figure>
            <div class='gallery justify-center'>
                <img style={imageStyle} src={src} title={title} />
            </div>

            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    );
}
