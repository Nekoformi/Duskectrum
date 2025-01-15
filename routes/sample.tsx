import { Head } from '$fresh/runtime.ts';

import Board from '@myBoard';
import { page } from '@page/sample.tsx';

export default function Sample(req: Request) {
    return (
        <>
            <Head>
                <title>Sample - Duskectrum</title>
            </Head>

            <Board request={req} type='common' className='document'>
                {page}
            </Board>
        </>
    );
}
