import { JSX } from 'preact/jsx-runtime';

type mainProps = {
    style?: JSX.CSSProperties;
    children?: JSX.Element;
};

export default function Main({ style, children }: mainProps): JSX.Element {
    const mainStyle: JSX.CSSProperties = {
        position: 'relative',
        width: 'calc(100% - 16px)',
        height: 'calc(100% - 16px)',
        margin: '8px',
    };

    if (style) Object.assign(mainStyle, style);

    return <main style={mainStyle}>{children}</main>;
}
