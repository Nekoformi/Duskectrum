import Link from '@components/Common/Link.tsx';
import PixelatedImage from '@components/Common/PixelatedImage.tsx';
import Frame from '@myFrame';

export const page_en = (
    <>
        <figure>
            <div class='gallery justify-center'>
                <img src='/image/logo.png' />
            </div>
        </figure>

        <p>
            Produced by <Link href='/profile#Sara%20Kotova'>Sara Kotova</Link><br />
            Created by <Link href='/profile#Nekoformi'>Nekoformi</Link>
        </p>

        <h2>Summary</h2>

        <p>
            This is a website created using the runtime: <Link href='https://deno.com/'>Deno</Link> and the framework: <Link href='https://fresh.deno.dev/'>Fresh</Link>. The functional frame is the unit that displays the content, and we have adorned it with beautiful colors reminiscent of a dusk. We primarily distribute our projects and works here, so please enjoy them as time permits!
        </p>

        <h2>About the frame</h2>

        <p>
            Below we present an example of a frame.
        </p>

        <div class='content'>
            <Frame
                title='Sample Frame'
                height='auto'
                frameStyle='card'
                frameType={['setMinimize', 'setMaximize', 'setHide', 'setFold', 'setClose']}
                className='document'
            >
                <>
                    <p>
                        This is a frame. It follows the same design philosophy as existing operating systems, with a title indicating the contents of the frame on the top left side, and functions for operating the frame on the top right side.
                    </p>

                    <ul>
                        <li><b>Minimize</b></li>
                        <ul>
                            <li>Pressing the "." button causes the frame to transform into its minimum area. Pressing the "!" button again restores it to its original state.</li>
                            <li>This is an effective function when the frame is visually obtrusive.</li>
                        </ul>
                        <li><b>Maximize</b></li>
                        <ul>
                            <li>Pressing the "+" button causes the frame to transform into its maximum area. Pressing the "@" button again restores it to its original state.</li>
                            <li>This is an effective function when you want to fully enjoy the contents of the frame.</li>
                        </ul>
                        <li><b>Hide</b></li>
                        <ul>
                            <li>Pressing the "#" button conceals the contents of the frame. Pressing the "=" button again restores it to its original state.</li>
                            <li>This is an effective function when you need to concentrate on other information, prevent accidental operations, or when the frame contains information that should not be displayed on the screen.</li>
                        </ul>
                        <li><b>Fold</b></li>
                        <ul>
                            <li>Pressing the "V" button collapses the frame. Pressing the "Z" button again restores it to its original state.</li>
                            <li>This is an effective function when the contents or operations of the frame are no longer needed.</li>
                        </ul>
                        <li><b>Close</b></li>
                        <ul>
                            <li>Pressing the "X" button deletes the frame. To restore the frame, you need to perform individual operations or reload the page.</li>
                            <li>This is an effective function when the contents or operations of the frame are no longer needed.</li>
                        </ul>
                    </ul>
                </>
            </Frame>
        </div>

        <h2>Credit</h2>

        <PixelatedImage src='/image/sara.png' width={256} height={256}></PixelatedImage>

        <p class='tc'>
            Copyright © 2024 Sara Kotova, Nekoformi, at_0111 all rights reserved.
        </p>
    </>
);

export const page_ja = (
    <>
        <figure>
            <div class='gallery justify-center'>
                <img src='/image/logo.png' />
            </div>
        </figure>

        <p>
            Produced by <Link href='/profile#Sara%20Kotova'>Sara Kotova</Link><br />
            Created by <Link href='/profile#Nekoformi'>Nekoformi</Link>
        </p>

        <h2>概要</h2>

        <p>
            これはランタイム：<Link href='https://deno.com/'>Deno</Link>とフレームワーク：<Link href='https://fresh.deno.dev/'>Fresh</Link>を用いて作成されたウェブサイトです。機能的な枠（Frame）はコンテンツを表示する単位であり、そこに美しい夕暮れ（Dusk）が思い浮かぶ色調を飾りました。主に私たちが展開するプロジェクトや作品を配信していますので、時間が許す限り、お楽しみください！
        </p>

        <h2>枠について</h2>

        <p>
            以下に枠の例を提示します。
        </p>

        <div class='content'>
            <Frame
                title='Sample Frame'
                height='auto'
                frameStyle='card'
                frameType={['setMinimize', 'setMaximize', 'setHide', 'setFold', 'setClose']}
                className='document'
            >
                <>
                    <p>
                        これが枠です。既存の基本ソフトウェア（OS）と同じ設計思想であり、上部の左側に枠の内容を示す題名が、右側に枠を操作するための機能が付属しています。
                    </p>

                    <ul>
                        <li><b>最小化</b></li>
                        <ul>
                            <li>「.」ボタンを押すと枠が最小の領域に変形します。もう一度「!」ボタンを押すと元に戻ります。</li>
                            <li>枠が視覚的に邪魔な場合に効果的な機能です。</li>
                        </ul>
                        <li><b>最大化</b></li>
                        <ul>
                            <li>「+」ボタンを押すと枠が最大の領域に変形します。もう一度「@」ボタンを押すと元に戻ります。</li>
                            <li>枠の内容を堪能する場合に効果的な機能です。</li>
                        </ul>
                        <li><b>非表示</b></li>
                        <ul>
                            <li>「#」ボタンを押すと枠の内容が隠蔽されます。もう一度「=」ボタンを押すと元に戻ります。</li>
                            <li>他の情報に集中する、誤操作を防止する、画面上に映すべきではない情報が含まれる場合に効果的な機能です。</li>
                        </ul>
                        <li><b>束ねる</b></li>
                        <ul>
                            <li>「V」ボタンを押すと枠が折り畳まれます。もう一度「Z」ボタンを押すと元に戻ります。</li>
                            <li>枠の内容や操作が不要な場合に効果的な機能です。</li>
                        </ul>
                        <li><b>閉じる</b></li>
                        <ul>
                            <li>「X」ボタンを押すと枠が削除されます。枠を元に戻す場合は個別に操作を行うか、ページをリロードする必要があります。</li>
                            <li>枠の内容や操作が不要な場合に効果的な機能です。</li>
                        </ul>
                    </ul>
                </>
            </Frame>
        </div>

        <h2>クレジット</h2>

        <PixelatedImage src='/image/sara.png' width={256} height={256}></PixelatedImage>

        <p class='tc'>
            Copyright © 2024 Sara Kotova, Nekoformi, at_0111 全ての権利を留保しています。
        </p>
    </>
);
