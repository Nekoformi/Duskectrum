import { Head } from '$fresh/runtime.ts';

import Board from '@myBoard';
import { page } from '@page/profile.tsx';
import { useSignal } from '@preact/signals';

export default function Profile(req: Request) {
    const signal = useSignal('en');

    return (
        <>
            <Head>
                <title>Profile - Duskectrum</title>
            </Head>

            <Board request={req} type='common' className='document'>
                <>{page(signal)}</>
            </Board>
        </>
    );
}
