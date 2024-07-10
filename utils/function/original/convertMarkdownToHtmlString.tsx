// deno-lint-ignore-file no-explicit-any

import fm from 'front-matter';
import { marked } from 'marked';
import sanitize from 'sanitize-html';

import { myMarkedRenderer, mySanitizeOption } from '@function/original/myMarkdownConfig.tsx';

type convertMarkdownToHtmlStringRes = {
    meta: any;
    content: string;
};

export default async function convertMarkdownToHtmlString(postData: string): Promise<convertMarkdownToHtmlStringRes> {
    const metaData = {};

    // Reference: https://github.com/markedjs/marked/blob/master/docs/USING_ADVANCED.md
    // Reference: https://github.com/markedjs/marked/blob/master/docs/USING_PRO.md

    const preprocess = (markdown: string) => {
        const { attributes, body } = fm(markdown);

        Object.assign(metaData, attributes);

        return body;
    };

    marked.use({
        async: true,
        breaks: true,
        pedantic: false,
        gfm: true,
        extensions: myMarkedRenderer,
        hooks: { preprocess },
    });

    const postMarked = await marked(postData);

    // Reference: https://github.com/apostrophecms/sanitize-html

    return {
        meta: metaData,
        content: sanitize(postMarked.trim(), mySanitizeOption),
    };
}
