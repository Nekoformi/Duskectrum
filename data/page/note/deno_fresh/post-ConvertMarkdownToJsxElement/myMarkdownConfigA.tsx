import { TokenizerAndRendererExtension } from 'marked';
import sanitizeHtml, { IOptions } from 'sanitize-html';

import { unescapeHtml } from '@function/htmlMarkup.ts'; // We'll explain in the next step.

export const myMarkedRenderer: TokenizerAndRendererExtension[] = [
    {
        name: 'strong',
        renderer(token) {
            return `<b>${token.text}</b>`;
        },
    },
    {
        name: 'em',
        renderer(token) {
            return `<i>${token.text}</i>`;
        },
    },
    {
        name: 'del',
        renderer(token) {
            return `<s>${token.text}</s>`;
        },
    },
    {
        name: 'code',
        renderer(token) {
            return `<div class='content'><pre prop='${token.lang}'><code>${token.text}</code></pre></div>`;
        },
    },
    {
        name: 'listitem',
        renderer(token) {
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
        renderer(token) {
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
        renderer(token) {
            const attributes: string[] = [];

            if (token.title) attributes.push(`title='${token.title}'`);

            if (token.text.split('')[0] === '?') {
                const params = new URLSearchParams(unescapeHtml(token.text));
                const queryEntries = params.entries();
                const queryParamsObject = Object.fromEntries(queryEntries);

                for (const key in queryParamsObject) attributes.push(`${key}='${queryParamsObject[key]}'`);
            }

            return `<img src='${token.href}' ${attributes.join(' ')} />`;
        },
    },
];

export const mySanitizeOption: IOptions = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['s', 'del', 'ins', 'img']),
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
    },
};
