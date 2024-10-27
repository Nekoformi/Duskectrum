import { Head } from '$fresh/runtime.ts';
import { Handlers, PageProps } from '$fresh/server.ts';

import convertHtmlStringToJsxElement from '@function/original/convertHtmlStringToJsxElement.tsx';
import convertMarkdownToHtmlString from '@function/original/convertMarkdownToHtmlString.tsx';
import { myParsedRenderer } from '@function/original/myMarkdownConfig.tsx';
import Board from '@myBoard';

type postProps = {
    req: Request;
    title: string;
    date: string;
    author: string;
    content: string;
    raw: string;
    requestSourceData: boolean;
};

export const handler: Handlers<postProps> = {
    async GET(req, ctx) {
        try {
            const { post } = ctx.params;

            const query = Object.fromEntries(new URL(req.url).searchParams);
            const requestSourceData = query.source !== undefined;

            const postData = await Deno.readTextFile(`${Deno.cwd()}/data/page/note/${post}.md`);

            const { meta, content } = await convertMarkdownToHtmlString(postData);

            return ctx.render({
                req: req,
                title: meta.title || 'Untitled',
                date: meta.date || 'Unknown',
                author: meta.author || 'Unknown',
                content: content,
                raw: postData.trim(),
                requestSourceData: requestSourceData,
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

    return (
        <>
            <Head>
                <title>{data.title} - Duskectrum</title>
            </Head>

            <Board path={path} type='common' className='document'>
                <>
                    {data.requestSourceData
                        ? (
                            <div class='content'>
                                <pre>
                                    <code>{data.raw}</code>
                                </pre>
                            </div>
                        )
                        : (
                            <>
                                <p class='gray_tc'>
                                    Post: {data.author}
                                    <br />
                                    Date: {data.date}
                                </p>

                                {await convertHtmlStringToJsxElement(data.content, { renderer: myParsedRenderer })}
                            </>
                        )}
                </>
            </Board>
        </>
    );
}
