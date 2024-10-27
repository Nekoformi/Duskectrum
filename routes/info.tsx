import { Head } from '$fresh/runtime.ts';

import Link from '@components/Common/Link.tsx';
import { InfoAdvance } from '@islands/Original/Info.tsx';
import Board from '@myBoard';

export default function Info() {
    return (
        <>
            <Head>
                <title>Info - Duskectrum</title>
            </Head>

            <Board className='document'>
                <>
                    <h1>Info</h1>

                    <InfoAdvance />

                    <p>
                        Go to <Link href='/'>home</Link> page.
                    </p>
                </>
            </Board>
        </>
    );
}
