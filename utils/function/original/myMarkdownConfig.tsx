// deno-lint-ignore-file no-explicit-any

import { TokenizerAndRendererExtension } from 'marked';
import { JSX } from 'preact';
import sanitizeHtml, { IOptions } from 'sanitize-html';

import Code from '@components/Common/Code.tsx';
import Link from '@components/Common/Link.tsx';
import PixelatedImage from '@components/Common/PixelatedImage.tsx';
import { unescapeHtml } from '@function/htmlMarkup.ts';
import { rendererType } from '@function/original/convertHtmlStringToJsxElement.tsx';

export const myMarkedRenderer: TokenizerAndRendererExtension[] = [
    {
        name: 'strong',
        renderer(token: any) {
            return `<b>${token.text}</b>`;
        },
    },
    {
        name: 'em',
        renderer(token: any) {
            return `<i>${token.text}</i>`;
        },
    },
    {
        name: 'del',
        renderer(token: any) {
            return `<s>${token.text}</s>`;
        },
    },
    {
        name: 'code',
        renderer(token: any) {
            return `<div class='content'><pre prop='${token.lang}'><code>${token.text}</code></pre></div>`;
        },
    },
    {
        name: 'listitem',
        renderer(token: any) {
            const order = Number(token.raw.split('.')[0]);

            if (isNaN(order)) {
                return `<li>${token.text}</li>`;
            } else {
                return `<li value='${order}'>${token.text}</li>`;
            }
        },
    },
    {
        name: 'tablecell',
        renderer(token: any) {
            const textAlign = token.flags.align;

            if (token.flags.header) {
                return `<th class='${textAlign}'>${token.text}</th>`;
            } else {
                return `<td class='${textAlign}'>${token.text}</td>`;
            }
        },
    },
    {
        name: 'image',
        renderer(token: any) {
            const attributes: string[] = [];

            if (token.title) attributes.push(`title='${token.title}'`);

            if (token.text.split('')[0] === '?') {
                const params = new URLSearchParams(unescapeHtml(token.text));
                const queryEntries = params.entries();
                const queryParamsObject = Object.fromEntries(queryEntries);

                for (const key in queryParamsObject) attributes.push(`${key}='${queryParamsObject[key]}'`);
            }

            const format = token.href.split('.').pop();

            if (['png', 'jpg', 'gif', 'svg', 'webp'].includes(format)) return `<img src='${token.href}' ${attributes.join(' ')} />`;

            if (['mp4', 'webm'].includes(format)) return `<video src='${token.href}' ${attributes.join(' ')} />`;

            if (['mp3', 'weba', 'ogg'].includes(format)) return `<audio src='${token.href}' ${attributes.join(' ')} />`;

            return '';
        },
    },
];

export const mySanitizeOption: IOptions = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['s', 'del', 'ins', 'img', 'video', 'audio', 'iframe']),
    allowedAttributes: {
        div: ['class'],
        span: ['class'],
        a: ['href'],
        pre: ['prop'],
        li: ['value'],
        table: ['class'],
        th: ['class', 'colspan', 'rowspan'],
        td: ['class', 'colspan', 'rowspan'],
        img: ['src', 'title', 'width', 'height'],
        video: ['src', 'title', 'width', 'height'],
        audio: ['src', 'title'],
        iframe: ['src', 'title'],
    },
};

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
        tag: 'br',
        function: (_node: Node, _element: Element, _content: JSX.Element) => {
            if (_node.parentNode?.textContent !== '') {
                return <br />;
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
    {
        tag: 'table',
        function: (_node: Node, _element: Element, _content: JSX.Element) => {
            return (
                <div class='hugeContent'>
                    <table>{_content}</table>
                </div>
            );
        },
    },
    {
        tag: 'video',
        function: (_node: Node, _element: Element, _content: JSX.Element) => {
            const src = _element.getAttribute('src') || undefined;
            const format = src?.split('.').pop() || undefined;
            const title = _element.getAttribute('title') || undefined;
            const width = Number(_element.getAttribute('width')) || undefined;
            const height = Number(_element.getAttribute('height')) || undefined;

            return (
                <figure>
                    <video controls={true} width={width} height={height}>
                        <source src={src} type={`video/${format}`} />
                    </video>

                    {title && <figcaption>{title}</figcaption>}
                </figure>
            );
        },
    },
    {
        tag: 'audio',
        function: (_node: Node, _element: Element, _content: JSX.Element) => {
            const src = _element.getAttribute('src') || undefined;
            const format = src?.split('.').pop() || undefined;
            const title = _element.getAttribute('title') || undefined;
            const titleArray = title?.split(':::') || undefined;

            if (titleArray && titleArray.length > 1) {
                return (
                    <figure style={{ width: '384px', maxWidth: '100%' }}>
                        <img src={titleArray.pop()} />

                        <audio controls={true}>
                            <source src={src} type={`audio/${format}`} />
                        </audio>

                        {titleArray && <figcaption>{titleArray.join(':::')}</figcaption>}
                    </figure>
                );
            } else {
                return (
                    <figure style={{ width: '384px', maxWidth: '100%' }}>
                        <audio controls={true}>
                            <source src={src} type={`audio/${format}`} />
                        </audio>

                        {title && <figcaption>{title}</figcaption>}
                    </figure>
                );
            }
        },
    },
    {
        tag: 'iframe',
        function: (_node: Node, _element: Element, _content: JSX.Element) => {
            const src = _element.getAttribute('src') || undefined;
            const title = _element.getAttribute('title') || undefined;

            return (
                <div class='content'>
                    <div class='frame'>
                        <iframe src={src} style='border: 0' loading='lazy' width='100%' height='100%'></iframe>
                    </div>

                    {title && <div class='caption'>{title}</div>}
                </div>
            );
        },
    },
];
