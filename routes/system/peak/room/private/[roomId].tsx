import { Head } from '$fresh/runtime.ts';

import Board from '@myBoard';

export default function WIP(req: Request) {
    return (
        <>
            <Head>
                <title>WIP - Duskectrum</title>
            </Head>

            <Board request={req} type='common' className='document'>
                <>
                    <h1>WIP</h1>
                </>
            </Board>
        </>
    );
}
