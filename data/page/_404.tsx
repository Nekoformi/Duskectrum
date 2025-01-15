import Link from '@components/Common/Link.tsx';

export const page_en = (
    <>
        <h1>OOPS!</h1>

        <p>
            Page does not exist. The URL may contain typos or omissions, or may have been deleted by an administrator.
        </p>

        <p>
            Go to <Link href='/'>home</Link> page.
        </p>
    </>
);

export const page_ja = (
    <>
        <h1>おっと！</h1>

        <p>
            ページは存在しません。URLに誤字・脱字が含まれているか、管理者によって削除された可能性があります。
        </p>

        <p>
            <Link href='/'>ホーム</Link>に戻りましょう。
        </p>
    </>
);
