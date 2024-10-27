import { Head } from '$fresh/runtime.ts';

import GetSecureHashAlgorithm from '@islands/Function/GetSecureHashAlgorithm/GetSecureHashAlgorithm.tsx';
import Board from '@myBoard';

export default function Function(req: Request) {
    return (
        <>
            <Head>
                <title>Get Secure Hash Algorithm - Duskectrum</title>
            </Head>

            <Board request={req} type='common' className='document'>
                <>
                    <h1>Get Secure Hash Algorithm</h1>

                    <GetSecureHashAlgorithm />
                </>
            </Board>
        </>
    );
}
