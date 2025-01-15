import highlightJs from 'highlight_js';
import { JSX } from 'preact/jsx-runtime';

import { IS_PRINT_MODE } from '@data/dev.ts';
import Frame, { getFrameHeight } from '@myFrame';

type codeProps = {
    title?: string;
    line?: number;
    language?: string;
    content: string;
};

export default function Code({ title, line, language, content }: codeProps): JSX.Element {
    const frameWrapStyle: JSX.CSSProperties = {
        height: 'auto',
        maxHeight: !IS_PRINT_MODE ? `calc(${getFrameHeight()}px + 12pt * 1.5 * ${line || 16.5})` : '',
    };

    const frameStyle: JSX.CSSProperties = {
        display: 'flex',
    };

    const lineStyle: JSX.CSSProperties = {
        userSelect: 'none',
        marginRight: 'calc(12pt * 0.5)',
        textAlign: 'right',
    };

    const contentStyle: JSX.CSSProperties = {
        flexGrow: '1',
    };

    const lineNum = content.split('\n').length;

    const highlightLanguage = language && highlightJs.getLanguage(language) ? language : 'plaintext';
    const highlightContent = highlightJs.highlight(content, { language: highlightLanguage }).value;

    return (
        <Frame
            title={title || 'Code'}
            frameStyle='card'
            frameType={['setMaximize', 'setHide']}
            style={frameStyle}
            wrapStyle={frameWrapStyle}
            className='document'
        >
            <>
                <div className='gray_tc' style={lineStyle}>
                    <pre>{[...Array(lineNum)].map((_, i) => `${i + 1}:\n`)}</pre>
                </div>
                <div style={contentStyle}>
                    <pre>
                        <code>
                            <div dangerouslySetInnerHTML={{ __html: highlightContent }} />
                        </code>
                    </pre>
                </div>
            </>
        </Frame>
    );
}
