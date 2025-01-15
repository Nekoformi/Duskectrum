import { Head } from '$fresh/runtime.ts';

import Board from '@myBoard';

export default function Template(req: Request) {
    return (
        <>
            <Head>
                <title>[TITLE] - Duskectrum</title>
            </Head>

            <Board request={req} type='common' className='document'>
                <>
                    <h1>[TITLE]</h1>

                    <p>
                        [CONTENT]
                    </p>
                </>
            </Board>
        </>
    );
}
