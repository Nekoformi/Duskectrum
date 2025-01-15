export const page = (
    <>
        <section>
            <h1>見出し1 | Heading 1</h1>
            <h2>見出し2 | Heading 2</h2>
            <h3>見出し3 | Heading 3</h3>
            <h4>見出し4 | Heading 4</h4>
            <h5>見出し5 | Heading 5</h5>
            <h6>見出し6 | Heading 6</h6>

            <hr />
        </section>

        <section>
            <h2>文章 | Paragraph</h2>

            <p>
                いろはにほへとちりぬるを<br />
                The quick brown fox jumps over the lazy dog
            </p>
        </section>

        <section>
            <h2>文字 | Text</h2>

            <h3>通常 | Normal</h3>

            <p>
                いろはにほへとちりぬるを<br />
                The quick brown fox jumps over the lazy dog
            </p>

            <h3>太字 | Bold</h3>

            <p>
                strong要素は<strong>重要性、深刻性、緊急性</strong>を表している。<br />
                em要素は<em>コンテンツで不可欠な部分</em>を表している。<br />
                b要素は<b>上記以外の強調</b>を表している。
            </p>

            <p>
                The strong element represents <strong>strong importance, seriousness, or urgency</strong> for its contents.<br />
                The em element represents <em>stress emphasis</em> of its contents.<br />
                The b element represents <b>emphasis other than the above</b>.
            </p>

            <h3>斜体 | Italic</h3>

            <p>
                <i>いろはにほへとちりぬるを</i><br />
                <i>The quick brown fox jumps over the lazy dog</i>
            </p>

            <h3>打消 | Denial</h3>

            <p>
                <s>いろはにほへとちりぬるを</s><br />
                <s>The quick brown fox jumps over the lazy dog</s>
            </p>

            <h3>リンク | Link</h3>

            <p>
                <a href='https://ja.wikipedia.org/wiki/%E3%81%84%E3%82%8D%E3%81%AF%E6%AD%8C' target='_blank' rel='noreferrer'>いろはにほへとちりぬるを</a><br />
                <a href='https://ja.wikipedia.org/wiki/The_quick_brown_fox_jumps_over_the_lazy_dog' target='_blank' rel='noreferrer'>The quick brown fox jumps over the lazy dog</a>
            </p>

            <h3>引用 | Quote</h3>

            <p>
                <q>いろはにほへとちりぬるを</q><br />
                <q>The quick brown fox jumps over the lazy dog</q>
            </p>

            <h3>定義 | Defined</h3>

            <p>
                <dfn title='Hyper Text Markup Language'>HTML</dfn>とは、ウェブページを作成するためのマークアップ言語である。<br />
                <dfn title='Hyper Text Markup Language'>HTML</dfn> is a markup language for creating web pages.
            </p>

            <h3>略語 | Abbreviation</h3>

            <p>
                このページは<abbr title='Hyper Text Markup Language'>HTML</abbr>や<abbr title='Cascading Style Sheets'>CSS</abbr>、<abbr title='Java Script'>JS</abbr>で構成されている。<br />
                This page consists of <abbr title='Hyper Text Markup Language'>HTML</abbr>, <abbr title='Cascading Style Sheets'>CSS</abbr> and <abbr title='Java Script'>JS</abbr>.
            </p>

            <h3>出典 | Source</h3>

            <p>
                <cite>WIPO</cite>の統計によると、日本は2020年に約5万件の国際特許を出願したとされている。<br />
                According to statistics from the <cite>WIPO</cite>, Japan is said to have applied for about 50,000 international patents in 2020.
            </p>

            <p>
                <q><a href='https://www.wipo.int/portal/en/' target='_blank' rel='noreferrer'><cite>WIPO - World Intellectual Property Organization</cite></a></q>
            </p>

            <h3>上付文字 | Superscript</h3>

            <p>
                (8 / π<sup>2</sup>){'{'}cos(2πft) + (1 / 3<sup>2</sup>)cos(2π3ft) + (1 / 5<sup>2</sup>)cos(2π5ft) + ... + (1 / (2n - 1)<sup>2</sup>)cos(2π(2n - 1)ft){'}'}
            </p>

            <p>
                三角波のフーリエ級数は上記の式で表される。<br />
                The Fourier series of the triangular wave is expressed by the above equation.
            </p>

            <h3>下付文字 | Subscript</h3>

            <p>
                y(t) = Σ<sup>m</sup><sub>n = 1</sub>A<sub>n</sub>sin(2πnf<sub>0</sub>t + φ<sub>n</sub>)
            </p>

            <p>
                フーリエ合成を一般化した式を用いることで様々な波形を作成することができる。<br />
                A variety of waveforms can be created using a generalized formula for Fourier synthesis.
            </p>

            <h3>コード | Code</h3>

            <p>
                <code>いろはにほへとちりぬるを</code><br />
                <code>The quick brown fox jumps over the lazy dog</code>
            </p>

            <h3>変数 | Variable</h3>

            <pre>{`function isPrimeNumber(n) {
    if (n == 1) return false;
    if (n == 2) return true;

    for (i = 2; i < n; i++) {
        if (n % i == 0) return false;
        if (i + 1 == n) return true;
    }
}`}</pre>

            <p>
                これは<var>n</var>に入力された数値が素数か否かを判定する関数である。<br />
                This is a function that judges whether <var>n</var> is a prime number.
            </p>

            <h3>削除されたテキスト | Removed Text</h3>

            <p>
                いろはにほへと<del datetime='2000-01-01T00:00:00+09:00'>ちりぬるを</del><br />
                The quick brown fox jumps <del datetime='2000-01-01T00:00:00+09:00'>over the lazy dog</del>
            </p>

            <h3>追加されたテキスト | Inserted Text</h3>

            <p>
                いろはにほへと<ins datetime='2000-01-01T00:00:00+09:00'>ちりぬるを</ins><br />
                The quick brown fox jumps <ins datetime='2000-01-01T00:00:00+09:00'>over the lazy dog</ins>
            </p>

            <h3>色付き文字 | Color Text</h3>

            <p>
                <span class='red_tc'>赤色</span>，<span class='orange_tc'>橙色</span>，<span class='yellow_tc'>黄色</span>，<span class='lime_tc'>黄緑色</span>，<span class='green_tc'>緑色</span>，<span class='aqua_tc'>水色</span>，<span class='blue_tc'>青色</span>，<span class='purple_tc'>紫色</span><br />
                <span class='red_tc'>Red</span>, <span class='orange_tc'>Orange</span>, <span class='yellow_tc'>Yellow</span>, <span class='lime_tc'>Lime</span>, <span class='green_tc'>Green</span>, <span class='aqua_tc'>Aqua</span>, <span class='blue_tc'>Blue</span>, <span class='purple_tc'>Purple</span>
            </p>

            <h3>ハイライト文字 | Highlight Text</h3>

            <p>
                <span class='red_bc'>赤色</span>，<span class='orange_bc'>橙色</span>，<span class='yellow_bc'>黄色</span>，<span class='lime_bc'>黄緑色</span>，<span class='green_bc'>緑色</span>，<span class='aqua_bc'>水色</span>，<span class='blue_bc'>青色</span>，<span class='purple_bc'>紫色</span><br />
                <span class='red_bc'>Red</span>, <span class='orange_bc'>Orange</span>, <span class='yellow_bc'>Yellow</span>, <span class='lime_bc'>Lime</span>, <span class='green_bc'>Green</span>, <span class='aqua_bc'>Aqua</span>, <span class='blue_bc'>Blue</span>, <span class='purple_bc'>Purple</span>
            </p>
        </section>

        <section>
            <h2>ブロック | Block</h2>

            <h3>引用 | Quote</h3>

            <blockquote>
                いろはにほへとちりぬるを<br />
                The quick brown fox jumps over the lazy dog
            </blockquote>

            <h3>連絡先 | Address</h3>

            <address>
                いろはにほへとちりぬるを<br />
                The quick brown fox jumps over the lazy dog
            </address>
        </section>

        <section>
            <h2>リスト | List</h2>

            <h3>定義 | Definition</h3>

            <dl>
                <dt>人間</dt>
                <dd>Human</dd>
                <dd>Person</dd>
                <dt>機械</dt>
                <dd>Machine</dd>
                <dd>Mechanism</dd>
                <dt>知能</dt>
                <dd>Intelligence</dd>
                <dd>Chaos</dd>
            </dl>

            <h3>箇条書き | Bullet Points</h3>

            <ul>
                <li>
                    <b>対偶法</b>
                </li>
                <ul>
                    <li>命題 P⇒Q を証明する代わりに、これと同値な ￢Q⇒￢P を証明する方法。</li>
                </ul>
                <li>
                    <b>背理法 (帰謬法)</b>
                </li>
                <ul>
                    <li>命題 P を証明する代わりに、￢P が偽であることを証明する方法。</li>
                    <li>￢P が偽であることを証明するには、￢P を仮定して矛盾を導けばよい。</li>
                </ul>
                <li>
                    <b>反例</b>
                </li>
                <ul>
                    <li>命題「全ての x が P(x) を満たす」が偽であることを示すには、P(x) を満たさない x を一つ挙げればよい。</li>
                    <li>￢∀xPx と ∃x￢Px が同値であることを利用する。</li>
                </ul>
                <li>
                    <b>転換法</b>
                </li>
                <ul>
                    <li>全ての状況が P, Q, R のいずれかに分類でき、A, B, C が独立であり、「P⇒A」「Q⇒B」「R⇒C」が証明できる場合、それらの逆「A⇒P」「B⇒Q」「C⇒R」も成立する。</li>
                </ul>
                <li>
                    <b>同一法</b>
                </li>
                <ul>
                    <li>A⇒B が成り立ち、B を満たすものがただひとつであれば、B⇒A が成り立つ。</li>
                </ul>
                <li>
                    <b>鳩の巣原理</b>
                </li>
                <ul>
                    <li>n+1 個以上のボールのそれぞれが n 個の箱のいずれかに入る場合、少なくとも 1 個の箱には 2 個以上のボールが入っている。</li>
                </ul>
                <li>
                    <b>数学的帰納法</b>
                </li>
                <ul>
                    <li>自然数に関する命題 P(n) が全ての n に対して成立することを示す論法。</li>
                </ul>
                <ol>
                    <li>P(1) が成立することを示す。</li>
                    <li>P(n) が成立すれば P(n+1) が成立することを示す。</li>
                </ol>
            </ul>

            <p>
                <q>
                    <a href='https://ja.wikipedia.org/wiki/%E8%A8%BC%E6%98%8E_(%E6%95%B0%E5%AD%A6)' target='_blank' rel='noreferrer'>Wikipedia - 証明 (数学)</a>
                </q>
            </p>
        </section>

        <section>
            <h2>テーブル | Table</h2>

            <table>
                <caption>表 1. ほげほげスコア</caption>
                <thead>
                    <tr>
                        <th>番号</th>
                        <th>名前</th>
                        <th>得点</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th colspan={2}>平均点</th>
                        <th class='number'>45.6</th>
                    </tr>
                </tfoot>
                <tbody>
                    <tr>
                        <th>0001</th>
                        <th>アリス</th>
                        <td class='number'>12.3</td>
                    </tr>
                    <tr>
                        <th>0002</th>
                        <th>ボブ</th>
                        <td class='number'>45.6</td>
                    </tr>
                    <tr>
                        <th>0003</th>
                        <th>マーヴィン</th>
                        <td class='number'>78.9</td>
                    </tr>
                </tbody>
            </table>

            <p>
                <q><a href='https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%AA%E3%82%B9%E3%81%A8%E3%83%9C%E3%83%96' target='_blank' rel='noreferrer'>Wikipedia - アリスとボブ</a></q>
            </p>

            <table class='fit'>
                <caption>表 2. 真理値表</caption>
                <thead>
                    <tr>
                        <th class='center'>命題 P</th>
                        <th class='center'>命題 Q</th>
                        <th class='center'>論理和</th>
                        <th class='center'>論理積</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class='center'>真</td>
                        <td class='center'>真</td>
                        <td class='center'>真</td>
                        <td class='center'>真</td>
                    </tr>
                    <tr>
                        <td class='center'>真</td>
                        <td class='center'>偽</td>
                        <td class='center'>真</td>
                        <td class='center'>偽</td>
                    </tr>
                    <tr>
                        <td class='center'>偽</td>
                        <td class='center'>真</td>
                        <td class='center'>真</td>
                        <td class='center'>偽</td>
                    </tr>
                    <tr>
                        <td class='center'>偽</td>
                        <td class='center'>偽</td>
                        <td class='center'>偽</td>
                        <td class='center'>偽</td>
                    </tr>
                </tbody>
            </table>

            <div class='hugeContent'>
                <table class='fix'>
                    <caption>表 3. 真理値表 (拡張)</caption>
                    <thead>
                        <tr>
                            <th class='center' style='width: 64px'>命題 P</th>
                            <th class='center' style='width: 64px'>命題 Q</th>
                            <th class='center' style='width: 64px'>P∧Q</th>
                            <th class='center' style='width: 64px'>P∨Q</th>
                            <th class='center' style='width: 64px'>P⇒Q</th>
                            <th class='center' style='width: 64px'>¬P∧Q</th>
                            <th class='center' style='width: 64px'>¬P∨Q</th>
                            <th class='center' style='width: 64px'>P∨¬Q</th>
                            <th class='center' style='width: 64px'>¬(P∧Q)</th>
                            <th class='center' style='width: 64px'>¬P∨¬Q</th>
                            <th class='center' style='width: 64px'>¬(P∨Q)</th>
                            <th class='center' style='width: 64px'>¬P∧¬Q</th>
                            <th class='center' style='width: 64px'>¬P⇒Q</th>
                            <th class='center' style='width: 64px'>P∧¬Q</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class='center lime_bc'>T</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center orange_bc'>F</td>
                        </tr>
                        <tr>
                            <td class='center lime_bc'>T</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center lime_bc'>T</td>
                        </tr>
                        <tr>
                            <td class='center orange_bc'>F</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center orange_bc'>F</td>
                        </tr>
                        <tr>
                            <td class='center orange_bc'>F</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center lime_bc'>T</td>
                            <td class='center orange_bc'>F</td>
                            <td class='center orange_bc'>F</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p>
                <q><a href='https://ja.wikipedia.org/wiki/%E7%9C%9F%E7%90%86%E5%80%A4%E8%A1%A8' target='_blank' rel='noreferrer'>Wikipedia - 真理値表</a></q>
            </p>
        </section>

        <section>
            <h2>メディア | Media</h2>

            <h3>画像 | Image</h3>

            <figure>
                <img src='https://images8.alphacoders.com/866/866391.jpg' />

                <figcaption>図 1. Retrowaveのイメージ</figcaption>
            </figure>

            <h3>画像 (複数枚) | Image Gallery</h3>

            <figure>
                <div class='gallery'>
                    <img src='https://images8.alphacoders.com/866/866402.jpg' />
                    <img src='https://images8.alphacoders.com/866/866407.png' />
                    <img src='https://images3.alphacoders.com/866/866409.jpg' />
                    <img src='https://images6.alphacoders.com/866/866417.jpg' />
                    <img src='https://images2.alphacoders.com/866/866449.jpg' />
                    <img src='https://images3.alphacoders.com/866/866450.jpg' />
                </div>

                <figcaption>図 2 - 7. Retrowaveのイメージ</figcaption>
            </figure>

            <h3>インラインフレーム | Inline Frame</h3>

            <div class='content'>
                <div class='frame'>
                    <iframe src='https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d6481.255405981119!2d139.75006087774716!3d35.686168035009054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z55qH5bGF!5e0!3m2!1sja!2sjp!4v1654525352497!5m2!1sja!2sjp' style='border: 0' loading='lazy' width='100%' height='100%'></iframe>
                </div>

                <div class='caption'>図 8. 皇居御所の周辺地図 (by Google Map)</div>
            </div>
        </section>

        <section>
            <h2>入力 | Input</h2>

            <h3>ボタン | Button</h3>

            <fieldset>
                <legend>ボタンを押してコマンドを実行</legend>
                <button>ボタン</button>
                <button disabled>選択できないボタン</button>
            </fieldset>

            <h3>データ | Data</h3>

            <fieldset>
                <div class='label'>　テキスト</div>
                <input type='text' placeholder='ここにテキストを入力' />
            </fieldset>

            <fieldset>
                <div class='label'>　　　数値</div>
                <input type='number' placeholder='数値' />
            </fieldset>

            <fieldset>
                <div class='label'>パスワード</div>
                <input type='password' placeholder='ここにパスワードを入力' />
            </fieldset>

            <fieldset>
                <div class='selectWrap'>
                    <select name='select'>
                        <option value='select_1'>選択肢A</option>
                        <option value='select_2'>選択肢B</option>
                        <option value='select_3'>選択肢C</option>
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <textarea>{`いろはにほへとちりぬるを
The quick brown fox jumps over the lazy dog`}</textarea>
            </fieldset>

            <h3>チェックボックス | Check Box</h3>

            <fieldset class='list'>
                <div>
                    <input type='checkbox' id='checkbox_1' name='checkbox' value='checkbox_1' checked />
                    <label for='checkbox_1'>チェックボックス</label>
                </div>
                <div>
                    <input type='checkbox' id='checkbox_2' name='checkbox' value='checkbox_2' />
                    <label for='checkbox_2'>チェックボックス</label>
                </div>
                <div>
                    <input type='checkbox' id='checkbox_3' name='checkbox' value='checkbox_3' />
                    <label for='checkbox_3'>チェックボックス</label>
                </div>
            </fieldset>

            <h3>ラジオボタン | Radio Button</h3>

            <fieldset class='list'>
                <div>
                    <input type='radio' id='radio_1' name='radio' value='radio_1' checked />
                    <label for='radio_1'>ラジオボタン</label>
                </div>
                <div>
                    <input type='radio' id='radio_2' name='radio' value='radio_2' />
                    <label for='radio_2'>ラジオボタン</label>
                </div>
                <div>
                    <input type='radio' id='radio_3' name='radio' value='radio_3' />
                    <label for='radio_3'>ラジオボタン</label>
                </div>
            </fieldset>
        </section>

        <section>
            <h2>サブセットフォント | Subset Font</h2>

            <h3>ラテン文字 | Latin Characters</h3>

            <p style='word-break: break-all'>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz
            </p>

            <h3>拡張ラテン文字 | Extend Latin Characters</h3>

            <p style='word-break: break-all'>
                ÀÁÂÃÄÅǍÆÇĐÈÉÊËĒĚÌÍÎÏĨĪǏÐÑŃŇǸÒÓÔÕÖØŌŎƠǑŒÙÚÛÜŨŪŬƯǓǕǗǙǛÝÞßàáâãäåǎæçđèéêëēěìíîïĩīǐðñńňǹòóôõöøōŏơǒœùúûüũūŭưǔǖǘǚǜýþÿĀāĂăƒɑɡ
            </p>

            <h3>ギリシャ文字 | Greek Characters</h3>

            <p style='word-break: break-all'>
                ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ<br />
                αβγδεζηθικλμνξοπρστυφχψω
            </p>

            <h3>キリル文字 | Cyrillic Characters</h3>

            <p style='word-break: break-all'>
                АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ<br />
                абвгдеёжзийклмнопрстуфхцчшщъыьэюя
            </p>

            <h3>カナ文字 | Kana Characters</h3>

            <p style='word-break: break-all'>
                ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ
            </p>

            <h3>全角ラテン文字 | Zen-Kaku Latin Characters</h3>

            <p style='word-break: break-all'>
                ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ<br />
                ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ
            </p>

            <h3>ひらがな | Hira Characters</h3>

            <p style='word-break: break-all'>
                ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ
            </p>

            <h3>カタカナ | Kata Characters</h3>

            <p style='word-break: break-all'>
                ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺ
            </p>

            <h3>数字 | Numbers</h3>

            <p style='word-break: break-all'>
                0123456789
            </p>

            <h3>全角数字 | Zen-Kaku Numbers</h3>

            <p style='word-break: break-all'>
                ０１２３４５６７８９
            </p>

            <h3>記号 | Symbols</h3>

            <p style='word-break: break-all'>
                {'!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'}
            </p>

            <h3>拡張記号 | Extend Symbols</h3>

            <p style='word-break: break-all'>
                ¡¢£¤¥¦§©ª«¬­®¯°±²³´¶·¸¹º»¼½¾¿
            </p>

            <h3>カナ記号 | Kana Symbols</h3>

            <p style='word-break: break-all'>
                ｡｢｣､･
            </p>

            <h3>全角記号 | Zen-Kaku Symbols</h3>

            <p style='word-break: break-all'>
                、。，．・：；？！゛゜｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈〉《》「」『』【】＋－×÷＝≠＜＞≦≧∞∴♂♀′″℃￥＄￠￡％＃＆＊＠☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓∈∋⊆⊇⊂⊃∪∩∧∨￢⇒⇔∀∃∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬Å‰♯♭♪∮∑∟⊿
            </p>

            <h3>特殊記号 | Special Symbols</h3>

            <p style='word-break: break-all'>
                ①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡㍻〝〟№㏍℡㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼㍻㋿
            </p>

            <h3>罫線 | Ruled Line</h3>

            <p style='word-break: break-all'>
                ─━│┃┄┅┆┇┈┉┊┋┌┍┎┏┐┑┒┓└┕┖┗┘┙┚┛├┝┞┟┠┡┢┣┤┥┦┧┨┩┪┫┬┭┮┯┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊╋╌╍╎╏═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬╭╮╯╰╱╲╳╴╵╶╷╸╹╺╻╼╽╾╿
            </p>

            <h3>JIS第1水準漢字 | Kanji (JIS-1)</h3>

            <p style='word-break: break-all'>
                亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕
            </p>

            <h3>JIS第2水準漢字 | Kanji (JIS-2)</h3>

            <p style='word-break: break-all'>
                弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙
            </p>
        </section>
    </>
);
