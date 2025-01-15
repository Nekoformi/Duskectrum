import { JSX } from 'preact/jsx-runtime';

import { defaultFrameButtonOption, defaultFrameOption, frameButtonOption, frameOption } from '@data/frame.ts';
import { FrameFunction } from '@islands/Original/Frame/FrameFunction.tsx';
import { FrameBox, FrameCard, frameObjectProps } from '@islands/Original/Frame/FrameObject.tsx';
import { Signal, useSignal } from '@preact/signals';

type frameStyle = 'card' | 'box';
type frameDesign = 'default';
type frameType = 'minimize' | 'setMinimize' | 'maximize' | 'setMaximize' | 'hide' | 'setHide' | 'fold' | 'setFold' | 'close' | 'setClose' | '';

export type frameProps = {
    title?: string;
    width?: string;
    height?: string;
    frameStyle?: frameStyle;
    frameDesign?: frameDesign;
    frameType?: frameType[];
    className?: string;
    wrapClassName?: string;
    style?: JSX.CSSProperties;
    wrapStyle?: JSX.CSSProperties;
    children?: JSX.Element;
};

export const getFrameWidth = () => {
    return (defaultFrameOption.safe + defaultFrameOption.margin + defaultFrameOption.border + defaultFrameOption.padding) * 2;
};

export const getFrameHeight = () => {
    return (
        (defaultFrameOption.safe + defaultFrameOption.margin + defaultFrameOption.border + defaultFrameOption.padding) * 2 +
        defaultFrameOption.font * 1.5 -
        defaultFrameOption.margin
    );
};

export default function Frame({
    title,
    width,
    height,
    frameStyle,
    frameDesign,
    frameType,
    className,
    wrapClassName,
    style,
    wrapStyle,
    children,
}: frameProps): JSX.Element {
    const setFrameTypeFlag = (name: frameType): Signal<boolean> => useSignal(frameType && frameType.includes(name) ? true : false);
    const setFrameType = (name: frameType): boolean => (frameType && frameType.includes(name) ? true : false);

    const minimizeFlag = setFrameTypeFlag('minimize');
    const maximizeFlag = setFrameTypeFlag('maximize');
    const hideFlag = setFrameTypeFlag('hide');
    const foldFlag = setFrameTypeFlag('fold');
    const closeFlag = setFrameTypeFlag('close');

    let frameOption: frameOption;
    let frameButtonOption: frameButtonOption;

    switch (frameDesign) {
        case 'default':
            frameOption = defaultFrameOption;
            frameButtonOption = defaultFrameButtonOption;
            break;
        default:
            frameOption = defaultFrameOption;
            frameButtonOption = defaultFrameButtonOption;
            break;
    }

    const frameFunctionType = {
        setMinimize: setFrameType('setMinimize'),
        minimizeFlag: minimizeFlag,
        setMaximize: setFrameType('setMaximize'),
        maximizeFlag: maximizeFlag,
        setHide: setFrameType('setHide'),
        hideFlag: hideFlag,
        setFold: setFrameType('setFold'),
        foldFlag: foldFlag,
        setClose: setFrameType('setClose'),
        closeFlag: closeFlag,
    };

    const frameEmptyStyle: JSX.CSSProperties = {
        pointerEvents: 'none',
    };

    if (style) Object.assign(frameEmptyStyle, style);

    const FrameTop = (): JSX.Element => {
        const topStyle: JSX.CSSProperties = {
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: `-${frameOption.margin}px`,
        };

        const titleStyle: JSX.CSSProperties = {
            overflow: 'hidden',
            flexGrow: '1',
            flexShrink: '2',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            color: frameOption.colorTopLeft,
        };

        return (
            <>
                <div></div>
                <div style={topStyle}>
                    <div style={titleStyle}>{title}</div>
                    {frameType && <FrameFunction type={frameFunctionType} option={frameOption} buttonOption={frameButtonOption} />}
                </div>
                <div></div>
            </>
        );
    };

    const FrameBody = (): JSX.Element => {
        const bodyWrapStyle: JSX.CSSProperties = {
            zIndex: (minimizeFlag.value || maximizeFlag.value) ? '1' : 'unset',
            overflow: 'hidden',
            width: '100%',
            height: !maximizeFlag.value && foldFlag.value ? '0' : '100%',
        };

        const bodyStyle: JSX.CSSProperties = {
            pointerEvents: hideFlag.value || (!maximizeFlag.value && foldFlag.value) ? 'none' : 'fill',
            overflow: 'scroll',
            // position: 'relative',
            display: !minimizeFlag.value ? 'block' : 'none',
            width: '100%',
            height: '100%',
            opacity: hideFlag.value || (!maximizeFlag.value && foldFlag.value) ? '0' : '1',
        };

        if (style) Object.assign(bodyStyle, style);

        let frameObject: frameObjectProps;

        switch (frameStyle) {
            case 'card':
                frameObject = FrameCard(frameOption);
                break;
            case 'box':
                frameObject = FrameBox(frameOption);
                break;
            default:
                frameObject = FrameCard(frameOption);
                break;
        }

        return (
            <>
                {frameObject.gridStart}
                <div style={bodyWrapStyle}>
                    <section class={className} style={bodyStyle}>
                        {children}
                    </section>
                </div>
                {frameObject.gridEnd}
            </>
        );
    };

    const FrameWrap = ({ children }: { children: JSX.Element }): JSX.Element => {
        const gridSize = frameOption.margin + frameOption.border + frameOption.padding;

        const frameWrapStyle: JSX.CSSProperties = {
            display: 'grid',
            gridTemplateColumns: `${gridSize}px minmax(0, 1fr) ${gridSize}px`,
            gridTemplateRows: `max-content ${gridSize}px minmax(0, 1fr) ${gridSize}px`,
            width: width !== undefined ? width : '100%',
            height: height !== undefined ? height : '100%',
            padding: `${frameOption.safe}px`,
            backgroundColor: frameOption.colorBackground,
            boxShadow: `0 0 ${frameOption.padding / 2}px ${frameOption.padding / 2}px ${frameOption.colorBackground}`,
        };

        const frameWrapSpecialStyle: JSX.CSSProperties = {
            zIndex: '2',
            position: 'absolute',
            gridColumn: 'full',
            gridRow: 'full',
        };

        if (wrapStyle) Object.assign(frameWrapStyle, wrapStyle);

        if (closeFlag.value) {
            Object.assign(frameWrapStyle, {
                display: 'none',
            });
        } else if (minimizeFlag.value) {
            Object.assign(frameWrapStyle, frameWrapSpecialStyle);
            Object.assign(frameWrapStyle, {
                width: 'auto',
                height: 'auto',
                maxWidth: 'auto',
                maxHeight: 'auto',
                bottom: '0',
                left: '0',
            });
        } else if (maximizeFlag.value) {
            Object.assign(frameWrapStyle, frameWrapSpecialStyle);
            Object.assign(frameWrapStyle, {
                width: '100%',
                height: '100%',
                minWidth: '100%',
                minHeight: '100%',
                top: '0',
                left: '0',
            });
        }

        if (hideFlag.value) {
            Object.assign(frameWrapStyle, {
                backgroundColor: frameOption.colorHide,
                boxShadow: `0 0 ${frameOption.padding / 2}px ${frameOption.padding / 2}px ${frameOption.colorHide}`,
            });
        }

        return (
            <div class={wrapClassName} style={frameWrapStyle}>
                {children}
            </div>
        );
    };

    // Note: Do not change the parent structure!

    return (
        <>
            <FrameWrap>
                <>
                    <FrameTop />
                    <FrameBody />
                </>
            </FrameWrap>
        </>
    );
}
