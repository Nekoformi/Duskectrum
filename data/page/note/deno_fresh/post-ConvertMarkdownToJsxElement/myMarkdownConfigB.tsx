import { JSX } from 'preact';

import Code from '@components/Common/Code.tsx'; // This is the original component.
import Link from '@components/Common/Link.tsx'; // This is the original component.
import PixelatedImage from '@components/Common/PixelatedImage.tsx'; // This is the original component.
import { rendererType } from '@function/original/convertHtmlStringToJsxElement.tsx';

export const myParsedRenderer: rendererType[] = [
    {
        tag: 'html',
        function: null,
    },
    {
        tag: 'head',
        function: null,
    },
    {
        tag: 'body',
        function: null,
    },
    {
        tag: 'a',
        function: (_node: Node, _element: Element, _content: JSX.Element) => {
            const href = _element.getAttribute('href') || undefined;

            return <Link href={href}>{_node.textContent || ''}</Link>;
        },
    },
    {
        tag: 'p',
        function: (_node: Node, _element: Element, _content: JSX.Element) => {
            if (_node.hasChildNodes()) {
                if (_node.childNodes[0].textContent !== '') {
                    return <p>{_content}</p>;
                } else {
                    return <>{_content}</>;
                }
            } else {
                return <></>;
            }
        },
    },
    {
        tag: 'pre',
        function: async (_node: Node, _element: Element, _content: JSX.Element) => {
            const prop = _element.getAttribute('prop') || undefined;

            const language = prop && prop.includes(':') ? prop.split(':')[0] : undefined;
            const title = prop && language ? prop.split(':').slice(1).join('') : prop;

            const code = _element.textContent || 'Note: This is an empty code!';
            const source = code.match(/^\[\]\(((https?:\/\/\S+)|(\/\S+))\)$/);

            if (source !== null) {
                const path = (/^https?:\/\/\S+$/.test(source[1]) ? '' : Deno.cwd()) + source[1];

                try {
                    const code = (await Deno.readTextFile(path)).trim();

                    return <Code title={title} language={language} content={code || ''} />;
                } catch (e) {
                    console.error(e);

                    return <Code title={title} content='Error: Failed to retrieve file!' />;
                }
            } else {
                return <Code title={title} language={language} content={code || ''} />;
            }
        },
    },
    {
        tag: 'img',
        function: (_node: Node, _element: Element, _content: JSX.Element) => {
            const src = _element.getAttribute('src') || undefined;
            const title = _element.getAttribute('title') || undefined;
            const width = Number(_element.getAttribute('width')) || undefined;
            const height = Number(_element.getAttribute('height')) || undefined;

            if (width || height) {
                return <PixelatedImage src={src || ''} title={title} caption={title} width={width} height={height} />;
            } else {
                if ((_node.parentElement as unknown as Element).getAttribute('class') === 'gallery') {
                    return <img src={src} />;
                } else {
                    return (
                        <figure>
                            <img src={src} />

                            {title && <figcaption>{title}</figcaption>}
                        </figure>
                    );
                }
            }
        },
    },
];
