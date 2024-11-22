import { Head } from '$fresh/runtime.ts';

import MultilingualContent from '@islands/Original/Miscellaneous/MultilingualContent.tsx';
import MultilingualContentSwitcher from '@islands/Original/Miscellaneous/MultilingualContentSwitcher.tsx';
import Board from '@myBoard';
import { page_en, page_ja } from '@page/_404.tsx';
import { useSignal } from '@preact/signals';

export default function Error404() {
    const signal = useSignal('en');

    return (
        <>
            <Head>
                <title>404 - Duskectrum</title>
            </Head>

            <Board className='document'>
                <>
                    <MultilingualContentSwitcher
                        language={[
                            { name: 'English', code: 'en' },
                            { name: '日本語', code: 'ja' },
                        ]}
                        signal={signal}
                    />

                    <MultilingualContent language='en' signal={signal}>
                        {page_en}
                    </MultilingualContent>
                    <MultilingualContent language='ja' signal={signal}>
                        {page_ja}
                    </MultilingualContent>
                </>
            </Board>
        </>
    );
}
