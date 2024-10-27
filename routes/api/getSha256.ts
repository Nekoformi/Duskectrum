import { FreshContext } from '$fresh/server.ts';

import getSha256 from '@function/getSha256.ts';

export const handler = async (_req: Request, _ctx: FreshContext): Promise<Response> => {
    const url = new URL(_req.url);
    const rec = url.searchParams.get('rec');

    let res = ''; // 'You need to enter a string into the "rec" query. (ex. "?rec=abc")';

    if (rec) res = await getSha256(rec);

    return new Response(res);
};
