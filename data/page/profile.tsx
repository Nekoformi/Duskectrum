import { JSX } from 'preact/jsx-runtime';

import Link from '@components/Common/Link.tsx';
import PixelatedImage from '@components/Common/PixelatedImage.tsx';
import { IS_PRINT_MODE } from '@data/dev.ts';
import { profileData } from '@data/profile.ts';
import MultilingualContent from '@islands/Original/Miscellaneous/MultilingualContent.tsx';
import MultilingualContentSwitcher from '@islands/Original/Miscellaneous/MultilingualContentSwitcher.tsx';
import Frame, { getFrameHeight } from '@myFrame';
import { Signal } from '@preact/signals';

const profileImageSize = 256; // px
const profileDataWidth = 512; // px

type profileItemProps = {
    name: string;
    children: JSX.Element;
};

const ProfileItem = ({ name, children }: profileItemProps): JSX.Element => {
    return (
        <p class='flex flex-col'>
            <span class='break-all'>
                <u>{name}:</u>
            </span>
            <span class='break-all' style={{ marginLeft: 'calc(12pt * 2)' }}>
                {children}
            </span>
        </p>
    );
};

type profileContentProps = {
    id: string;
    title: string;
    portrait: string;
    background: string;
    name: string;
    birthday: string;
    eMail: string;
    account: {
        name: string;
        link: string;
    }[];
    comment: JSX.Element;
};

const ProfileContent = ({ id, title, portrait, background, name, birthday, eMail, account, comment }: profileContentProps): JSX.Element => {
    const contentStyle: JSX.CSSProperties = {
        backgroundColor: !IS_PRINT_MODE ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255, 255, 255, 0.75)',
        backgroundBlendMode: !IS_PRINT_MODE ? 'multiply' : 'screen',
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    };

    const infoStyle: JSX.CSSProperties = {
        minWidth: `calc(100% - ${profileImageSize}px - 16px * 2)`,
        width: `${profileDataWidth}px`,
    };

    return (
        <div class='content'>
            <Frame
                title={title}
                height={!IS_PRINT_MODE ? `calc(${getFrameHeight() + profileImageSize + 16 * 2}px + 16px + 12pt * 1.5 * 3.5)` : undefined}
                frameStyle='card'
                frameType={['setMaximize']}
                className='document'
                style={contentStyle}
            >
                <div id={id} class='content flex flex-wrap justify-between'>
                    <div class='p-4'>
                        <PixelatedImage src={portrait} width={profileImageSize} height={profileImageSize} style={{ borderRadius: '50%' }} />
                    </div>

                    <div style={infoStyle}>
                        <ProfileItem name='Name'>
                            <>{name}</>
                        </ProfileItem>
                        <ProfileItem name='Birthday'>
                            <>{birthday}</>
                        </ProfileItem>
                        <ProfileItem name='E-Mail'>
                            <>{eMail}</>
                        </ProfileItem>
                        <ProfileItem name='Account'>
                            <>
                                {account.map((item, index) => (
                                    <>
                                        {item.name}: <Link>{item.link}</Link>
                                        {index !== account.length - 1 && <br />}
                                    </>
                                ))}
                            </>
                        </ProfileItem>
                        <ProfileItem name='Comment'>
                            <>{comment}</>
                        </ProfileItem>
                    </div>
                </div>
            </Frame>
        </div>
    );
};

export const page = (signal: Signal<string>): JSX.Element => {
    const profileComment = [
        <>
            <MultilingualContent language='en' signal={signal}>
                <>
                    I love red things. Apple, ThinkPad, Yumemi (Touhou project), and communism!<br />
                    Let's all embark on adventures in the world! Every way holds mysteries to be explored!<br />
                    In my main job, I write novels set in other worlds, focusing on science fiction and action!
                </>
            </MultilingualContent>
            <MultilingualContent language='ja' signal={signal}>
                <>
                    赤いモノが大好きです。リンゴ、ThinkPad、夢美（東方プロジェクト）、そして共産主義！<br />
                    皆様も世界を冒険しましょう！　全ての道には探求するべき謎が潜んでいます！<br />
                    本業ではサイエンス・フィクションとアクションを題材にした異世界の小説を書いているよ！
                </>
            </MultilingualContent>
            <MultilingualContent language='ru' signal={signal}>
                <>
                    Я люблю красные вещи. Яблоко, ThinkPad, Yumemi (проект Touhou) и коммунизм!<br />
                    Давайте все отправимся в приключения по миру! Каждый путь скрывает тайны, которые нужно исследовать!<br />
                    В своей основной работе я пишу романы, действие которых происходит в других мирах, с акцентом на научную фантастику и экшн!
                </>
            </MultilingualContent>
            <MultilingualContent language='eo' signal={signal}>
                <>
                    Mi amas ruĝajn aferojn. Pomo, ThinkPad, Yumemi (projekto de Touhou), kaj komunismo!<br />
                    Ni ĉiuj enŝipiĝu en aventurojn en la mondo! Ĉiu vojo enhavas misterojn por esplori!<br />
                    En mia ĉefa laboro, mi skribas romanojn lokigitajn en aliaj mondoj, kun fokuso pri sciencfikcio kaj ago!
                </>
            </MultilingualContent>
        </>,
        <>
            <MultilingualContent language='en' signal={signal}>
                <>
                    I am a student who develops websites and simple software on a small projects.<br />
                    My main role is managing here, so I don't have many opportunities to participate actively... except for posting memos related to coding.<br />
                    As for my preferences... I guess it's shortcake and energy drinks? Since I use my brain a lot...
                </>
            </MultilingualContent>
            <MultilingualContent language='ja' signal={signal}>
                <>
                    本ウェブサイトや簡単なソフトウェアを細々と開発している学生です。<br />
                    主な担当はココの運営なので出番は少ないですが…唯一、プログラミングに関する備忘録を投稿しています。<br />
                    好きなものは…ショートケーキとエナジードリンクですかね…？　頭脳を使うので…。
                </>
            </MultilingualContent>
            <MultilingualContent language='ru' signal={signal}>
                <>
                    Я студент, который разрабатывает веб-сайты и простое программное обеспечение на небольших проектах.<br />
                    Моя основная роль здесь - управление, поэтому у меня не так много возможностей активно участвовать... за исключением публикации заметок, связанных с кодированием.<br />
                    Что касается моих предпочтений... думаю, это клубничный пирог и энергетические напитки? Поскольку я много использую свой мозг...
                </>
            </MultilingualContent>
            <MultilingualContent language='eo' signal={signal}>
                <>
                    Mi estas studento kiu disvolvas retejojn kaj simplajn programarojn en malgrandaj projektoj.<br />
                    Mia ĉefa rolo estas administri ĉi tie, do mi ne havas multajn ŝancojn partopreni aktive... escepte por afiŝado de notoj rilataj al programado.<br />
                    Kvanto al miaj preferoj... Mi supozas, ke estas fragkuko kaj energia trinkaĵo? Ĉar mi multe uzas mian cerbon...
                </>
            </MultilingualContent>
        </>,
        <>
            <MultilingualContent language='en' signal={signal}>
                <>
                    I am creator. And a perfectionist.<br />
                    GIMP, Blender, MediBang Paint Pro, AviUtl, Audacity, I love them.<br />
                    Basically anonymous, so caring about the sense of a name is a waste.
                </>
            </MultilingualContent>
            <MultilingualContent language='ja' signal={signal}>
                <>
                    ものづくり人間。そして完璧主義者。<br />
                    GIMP、Blender、MediBang Paint Pro、AviUtl、Audacity、アイシテル。<br />
                    基本的に匿名なので、名前のセンスは気にしたら負け。
                </>
            </MultilingualContent>
            <MultilingualContent language='ru' signal={signal}>
                <>
                    Я создатель. И перфекционист.<br />
                    GIMP, Blender, MediBang Paint Pro, AviUtl, Audacity, я люблю их.<br />
                    В основном анонимен, так что забота о смысле имени - это пустая трата.
                </>
            </MultilingualContent>
            <MultilingualContent language='eo' signal={signal}>
                <>
                    Mi estas kreinto. Kaj perfektumanto.<br />
                    GIMP, Blender, MediBang Paint Pro, AviUtl, Audacity, mi amas ilin.<br />
                    Baze anonima, do zorgi pri la senco de nomo estas malutilo.
                </>
            </MultilingualContent>
        </>,
    ];

    return (
        <>
            <MultilingualContentSwitcher
                language={[
                    { name: 'English', code: 'en' },
                    { name: '日本語', code: 'ja' },
                    { name: 'Русский', code: 'ru' },
                    { name: 'Esperanto', code: 'eo' },
                ]}
                signal={signal}
            />

            <h1>Profile</h1>

            {profileData.map((item, index) => (
                <ProfileContent
                    id={item.name}
                    title={`Profile ${index + 1}`}
                    portrait={item.portraitImagePath}
                    background={item.backgroundImagePath}
                    name={`${item.nameOriginal} (${item.name})`}
                    birthday={item.birthday}
                    eMail={item.eMail}
                    account={item.account}
                    comment={profileComment[index]}
                />
            ))}
        </>
    );
};
