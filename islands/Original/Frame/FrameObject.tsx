import { JSX } from 'preact/jsx-runtime';

import { frameOption } from '@data/frame.ts';

export type frameObjectProps = {
    gridStart: JSX.Element;
    gridEnd: JSX.Element;
};

const FrameLine = ({ pos, option }: { pos: string; option: frameOption }): JSX.Element => {
    const style: JSX.CSSProperties = {
        content: '',
        width: 'tb'.includes(pos) ? '100%' : `${option.border}px`,
        height: 'lr'.includes(pos) ? '100%' : `${option.border}px`,
    };

    switch (pos) {
        case 't':
            Object.assign(style, {
                marginTop: `${option.margin}px`,
                marginBottom: `${option.padding}px`,
                background: `linear-gradient(to right, ${option.colorTopLeft}, ${option.colorTopRight})`,
            });
            break;
        case 'b':
            Object.assign(style, {
                marginTop: `${option.padding}px`,
                marginBottom: `${option.margin}px`,
                background: `linear-gradient(to right, ${option.colorBottomLeft}, ${option.colorBottomRight})`,
            });
            break;
        case 'l':
            Object.assign(style, {
                marginLeft: `${option.margin}px`,
                marginRight: `${option.padding}px`,
                background: `linear-gradient(${option.colorTopLeft}, ${option.colorBottomLeft})`,
            });
            break;
        case 'r':
            Object.assign(style, {
                marginLeft: `${option.padding}px`,
                marginRight: `${option.margin}px`,
                background: `linear-gradient(${option.colorTopRight}, ${option.colorBottomRight})`,
            });
            break;
    }

    return <div style={style}></div>;
};

const FrameCardCorner = ({ pos, option }: { pos: string; option: frameOption }): JSX.Element => {
    const style: JSX.CSSProperties = {
        content: '',
        width: `${option.padding / 2 + option.border}px`,
        height: `${option.padding / 2 + option.border}px`,
    };

    {
        if (pos[0] === 't') {
            Object.assign(style, {
                bottom: '0',
                marginBottom: `${option.padding / 2}px`,
            });
        }

        if (pos[0] === 'b') {
            Object.assign(style, {
                top: '0',
                marginTop: `${option.padding / 2}px`,
            });
        }

        if (pos[1] === 'l') {
            Object.assign(style, {
                right: '0',
                marginRight: `${option.padding / 2}px`,
            });
        }

        if (pos[1] === 'r') {
            Object.assign(style, {
                left: '0',
                marginLeft: `${option.padding / 2}px`,
            });
        }
    }

    switch (pos) {
        case 'tl':
            Object.assign(style, {
                borderTopLeftRadius: `${option.padding / 2}px`,
                borderTop: `solid ${option.border}px ${option.colorTopLeft}`,
                borderLeft: `solid ${option.border}px ${option.colorTopLeft}`,
            });
            break;
        case 'tr':
            Object.assign(style, {
                borderTopRightRadius: `${option.padding / 2}px`,
                borderTop: `solid ${option.border}px ${option.colorTopRight}`,
                borderRight: `solid ${option.border}px ${option.colorTopRight}`,
            });
            break;
        case 'bl':
            Object.assign(style, {
                borderBottomLeftRadius: `${option.padding / 2}px`,
                borderBottom: `solid ${option.border}px ${option.colorBottomLeft}`,
                borderLeft: `solid ${option.border}px ${option.colorBottomLeft}`,
            });
            break;
        case 'br':
            Object.assign(style, {
                borderBottomRightRadius: `${option.padding / 2}px`,
                borderBottom: `solid ${option.border}px ${option.colorBottomRight}`,
                borderRight: `solid ${option.border}px ${option.colorBottomRight}`,
            });
            break;
    }

    return (
        <div class='relative'>
            <span class='absolute' style={style}></span>
        </div>
    );
};

export const FrameCard = (option: frameOption): frameObjectProps => {
    return {
        gridStart: (
            <>
                <FrameCardCorner pos='tl' option={option} />
                <FrameLine pos='t' option={option} />
                <FrameCardCorner pos='tr' option={option} />
                <FrameLine pos='l' option={option} />
            </>
        ),
        gridEnd: (
            <>
                <FrameLine pos='r' option={option} />
                <FrameCardCorner pos='bl' option={option} />
                <FrameLine pos='b' option={option} />
                <FrameCardCorner pos='br' option={option} />
            </>
        ),
    };
};

const FrameBoxCorner = ({ pos, option }: { pos: string; option: frameOption }): JSX.Element => {
    const horizonStyle: JSX.CSSProperties = {
        content: '',
        top: pos[0] === 't' ? `${option.margin}px` : `${option.padding}px`,
        bottom: pos[0] === 't' ? `${option.padding}px` : `${option.margin}px`,
        left: pos[1] === 'l' ? '0' : `${option.padding / 2}px`,
        right: pos[1] === 'l' ? `${option.padding / 2}px` : '0',
    };

    const verticalStyle: JSX.CSSProperties = {
        content: '',
        top: pos[0] === 't' ? '0' : `${option.padding / 2}px`,
        bottom: pos[0] === 't' ? `${option.padding / 2}px` : '0',
        left: pos[1] === 'l' ? `${option.margin}px` : `${option.padding}px`,
        right: pos[1] === 'l' ? `${option.padding}px` : `${option.margin}px`,
    };

    switch (pos) {
        case 'tl':
            Object.assign(horizonStyle, {
                backgroundColor: option.colorTopLeft,
            });
            Object.assign(verticalStyle, {
                backgroundColor: option.colorTopLeft,
            });
            break;
        case 'tr':
            Object.assign(horizonStyle, {
                backgroundColor: option.colorTopRight,
            });
            Object.assign(verticalStyle, {
                backgroundColor: option.colorTopRight,
            });
            break;
        case 'bl':
            Object.assign(horizonStyle, {
                backgroundColor: option.colorBottomLeft,
            });
            Object.assign(verticalStyle, {
                backgroundColor: option.colorBottomLeft,
            });
            break;
        case 'br':
            Object.assign(horizonStyle, {
                backgroundColor: option.colorBottomRight,
            });
            Object.assign(verticalStyle, {
                backgroundColor: option.colorBottomRight,
            });
            break;
    }

    return (
        <div class='relative'>
            <span class='absolute' style={horizonStyle}></span>
            <span class='absolute' style={verticalStyle}></span>
        </div>
    );
};

export const FrameBox = (option: frameOption): frameObjectProps => {
    return {
        gridStart: (
            <>
                <FrameBoxCorner pos='tl' option={option} />
                <FrameLine pos='t' option={option} />
                <FrameBoxCorner pos='tr' option={option} />
                <FrameLine pos='l' option={option} />
            </>
        ),
        gridEnd: (
            <>
                <FrameLine pos='r' option={option} />
                <FrameBoxCorner pos='bl' option={option} />
                <FrameLine pos='b' option={option} />
                <FrameBoxCorner pos='br' option={option} />
            </>
        ),
    };
};
