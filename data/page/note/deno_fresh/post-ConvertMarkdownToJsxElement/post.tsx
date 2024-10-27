import { Head } from '$fresh/runtime.ts';
import { Handlers, PageProps } from '$fresh/server.ts';

import convertHtmlStringToJsxElement from '@function/original/convertHtmlStringToJsxElement.tsx'; // We'll explain in the next step.
import convertMarkdownToHtmlString from '@function/original/convertMarkdownToHtmlString.tsx'; // We'll explain in the next step.
import { myParsedRenderer } from '@function/original/myMarkdownConfig.tsx'; // We'll explain in the next step.
import Board from '@myBoard'; // This is the original component.

type postProps = {
    req: Request;
    title: string;
    date: string;
    author: string;
    content: string;
};

export const handler: Handlers<postProps> = {
    async GET(req, ctx) {
        try {
            const { post } = ctx.params;

            const postData = await Deno.readTextFile(`${Deno.cwd()}/data/page/note/${post}.md`);

            const { meta, content } = await convertMarkdownToHtmlString(postData); // We'll explain in the next step.

            return ctx.render({
                req: req,
                title: meta.title || 'Untitled',
                date: meta.date || 'Unknown',
                author: meta.author || 'Unknown',
                content: content,
            });
        } catch (e) {
            console.error(e);

            return new Response('', {
                status: 303,
                headers: {
                    Location: '/error',
                },
            });
        }
    },
};

export default async function Post(_: Request, { data }: PageProps<postProps>) {
    const req = data.req;
    const path = req && new URL(req.url).pathname;

    const post = await convertHtmlStringToJsxElement(data.content, { renderer: myParsedRenderer }); // We'll explain in the next step.

    return (
        <>
            <Head>
                <title>{data.title} - Duskectrum</title>
            </Head>

            <Board path={path} type='common' className='document'>
                <>
                    <p class='gray_tc'>
                        Post: {data.author}
                        <br />
                        Date: {data.date}
                    </p>

                    {post}
                </>
            </Board>
        </>
    );
}
