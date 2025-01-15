import { JSX } from 'preact/jsx-runtime';

import Main from '@components/Common/Main.tsx';
import { IS_PRINT_MODE } from '@data/dev.ts';
import { defaultFrameButtonOption, defaultFrameOption } from '@data/frame.ts';
import { getDeviceType } from '@function/info/getDeviceInfo.ts';
import Mode from '@islands/Original/Frame/Mode.tsx';
import Info from '@islands/Original/Info.tsx';
import Menu from '@islands/Original/Menu.tsx';
import Frame from '@myFrame';
import { useSignal } from '@preact/signals';

type mainProps = {
    request?: Request;
    path?: string;
    type?: string;
    className?: string;
    style?: JSX.CSSProperties;
    children?: JSX.Element;
};

const SingleBoard = ({ className, style, children }: mainProps): JSX.Element => {
    return (
        <Main>
            <Frame title='Content' frameStyle='box' width='100%' height='100%' frameType={['setHide']} style={style} className={className}>
                {children}
            </Frame>
        </Main>
    );
};

const CommonBoard = ({ request, path, className, style, children }: mainProps): JSX.Element => {
    const deviceType = getDeviceType(navigator.userAgent);

    const directory = path || (request?.url && new URL(request.url).pathname);

    if (deviceType !== 'Mobile') {
        const mainStyle: JSX.CSSProperties = {
            display: 'grid',
            gridTemplateColumns: 'minmax(120px, 25%) 1fr',
            gridTemplateRows: !IS_PRINT_MODE ? 'max-content minmax(0, 1fr)' : '1fr',
        };

        const infoStyle: JSX.CSSProperties = {
            gridColumn: '1 / 3',
            gridRow: '1 / 2',
        };

        const menuStyle: JSX.CSSProperties = {
            gridColumn: '1 / 2',
            gridRow: !IS_PRINT_MODE ? '2 / 3' : '1 / 2',
        };

        const contentStyle: JSX.CSSProperties = {
            gridColumn: '2 / 3',
            gridRow: !IS_PRINT_MODE ? '2 / 3' : '1 / 2',
        };

        return (
            <Main style={mainStyle}>
                <>
                    {!IS_PRINT_MODE && (
                        <Frame title='Info' frameStyle='box' frameType={['setHide']} wrapStyle={infoStyle} className='document'>
                            <Info />
                        </Frame>
                    )}
                    <Frame title='Menu' frameStyle='box' frameType={['setMinimize', 'setMaximize', 'setHide']} wrapStyle={menuStyle}>
                        <Menu directory={directory} />
                    </Frame>
                    <Frame
                        title='Content'
                        frameStyle='box'
                        frameType={['setMinimize', 'setMaximize', 'setHide']}
                        style={style}
                        wrapStyle={contentStyle}
                        className={className}
                    >
                        {children}
                    </Frame>
                </>
            </Main>
        );
    } else {
        const mainStyle: JSX.CSSProperties = {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'minmax(0, 1fr) max-content',
        };

        const modeStyle: JSX.CSSProperties = {
            gridColumn: '1 / 2',
            gridRow: '2 / 3',
        };

        const mode = useSignal(2);

        type frameWrapProps = {
            index: number;
            children: JSX.Element;
        };

        const FrameWrap = ({ index, children }: frameWrapProps): JSX.Element => {
            const style: JSX.CSSProperties = {
                gridColumn: '1 / 2',
                gridRow: '1 / 2',
            };

            if (mode.value !== index) {
                Object.assign(style, {
                    pointerEvents: 'none',
                    display: 'none',
                    opacity: '0',
                });
            }

            return <div style={style}>{children}</div>;
        };

        return (
            <Main style={mainStyle}>
                <>
                    <FrameWrap index={0}>
                        <Frame title='Info' frameStyle='box' frameType={['setHide']} className='document'>
                            <Info />
                        </Frame>
                    </FrameWrap>
                    <FrameWrap index={1}>
                        <Frame title='Menu' frameStyle='box' frameType={['setMaximize', 'setHide']}>
                            <Menu directory={directory} />
                        </Frame>
                    </FrameWrap>
                    <FrameWrap index={2}>
                        <Frame title='Content' frameStyle='box' frameType={['setMaximize', 'setHide']} style={style} className={className}>
                            {children}
                        </Frame>
                    </FrameWrap>
                    <Mode
                        signal={mode}
                        list={['Info', 'Menu', 'Content']}
                        style={modeStyle}
                        option={defaultFrameOption}
                        buttonOption={defaultFrameButtonOption}
                    />
                </>
            </Main>
        );
    }
};

export default function Board({ request, path, type, style, className, children }: mainProps): JSX.Element {
    switch (type) {
        case 'single':
            return (
                <SingleBoard style={style} className={className}>
                    {children}
                </SingleBoard>
            );
        case 'common':
            return (
                <CommonBoard request={request} path={path} style={style} className={className}>
                    {children}
                </CommonBoard>
            );
        default:
            return (
                <SingleBoard style={style} className={className}>
                    {children}
                </SingleBoard>
            );
    }
}
