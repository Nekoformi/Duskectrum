import { JSX } from 'preact/jsx-runtime';

import { IS_PRINT_MODE } from '@data/dev.ts';

type mainProps = {
    style?: JSX.CSSProperties;
    children?: JSX.Element;
};

export default function Main({ style, children }: mainProps): JSX.Element {
    const mainStyle: JSX.CSSProperties = {
        position: 'relative',
        width: !IS_PRINT_MODE ? 'calc(100% - 16px)' : '100%',
        height: !IS_PRINT_MODE ? 'calc(100% - 16px)' : 'initial',
        margin: !IS_PRINT_MODE ? '8px' : '0',
    };

    if (style) Object.assign(mainStyle, style);

    return <main style={mainStyle}>{children}</main>;
}
