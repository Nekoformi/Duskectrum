import { Head } from '$fresh/runtime.ts';

import CalcBeatsPerMinute from '@islands/Function/CalcBeatsPerMinute/CalcBeatsPerMinute.tsx';
import Board from '@myBoard';

export default function Function(req: Request) {
    return (
        <>
            <Head>
                <title>Calc Beats Per Minute - Duskectrum</title>
            </Head>

            <Board request={req} type='common' className='document'>
                <>
                    <h1>Calc Beats Per Minute</h1>

                    <CalcBeatsPerMinute />
                </>
            </Board>
        </>
    );
}
