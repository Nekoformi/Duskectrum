import type { PageProps } from '$fresh/server.ts';
import { JSX } from 'preact/jsx-runtime';

import { IS_PRINT_MODE } from '@data/dev.ts';

export default function App({ Component }: PageProps) {
    const bodyStyle: JSX.CSSProperties = {
        width: !IS_PRINT_MODE ? '100vw' : 'calc(100vw - 16px)',
        height: !IS_PRINT_MODE ? '100vh' : 'calc(100vw - 16px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: !IS_PRINT_MODE ? '0' : '8px',
        color: !IS_PRINT_MODE ? '#fff' : '#000',
        backgroundColor: !IS_PRINT_MODE ? '#111' : '#fff',
    };

    return (
        <html>
            <head>
                <meta charset='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />

                <title>Duskectrum</title>

                <link rel='stylesheet' href='/style/common.css' />

                <link rel='stylesheet' href='/style/components/frame.css' />
                <link rel='stylesheet' href='/style/components/menu.css' />

                <link rel='stylesheet' href='/style/document/heading.css' />
                <link rel='stylesheet' href='/style/document/paragraph.css' />
                <link rel='stylesheet' href='/style/document/text.css' />
                <link rel='stylesheet' href='/style/document/decoration.css' />
                <link rel='stylesheet' href='/style/document/block.css' />
                <link rel='stylesheet' href='/style/document/list.css' />
                <link rel='stylesheet' href='/style/document/table.css' />
                <link rel='stylesheet' href='/style/document/media.css' />
                <link rel='stylesheet' href='/style/document/input.css' />

                <link rel='stylesheet' href={`/style/modules/highlight.js/github-${!IS_PRINT_MODE ? 'dark' : 'light'}.min.css`} />
            </head>

            <body style={bodyStyle}>
                <Component />
            </body>
        </html>
    );
}
