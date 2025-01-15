import { JSX } from 'preact/jsx-runtime';

import { frameButtonOption, frameOption } from '@data/frame.ts';
import { Signal } from '@preact/signals';

type modeProps = {
    signal: Signal<number>;
    list: string[];
    style?: JSX.CSSProperties;
    option: frameOption;
    buttonOption: frameButtonOption;
};

export default function Mode({ signal, list, style, option, buttonOption }: modeProps): JSX.Element {
    type buttonProps = {
        index: number;
        children: string;
    };

    const Button = ({ index, children }: buttonProps): JSX.Element => {
        const style: JSX.CSSProperties = {
            cursor: 'pointer',
            userSelect: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: `calc(${(1 / list.length) * 100}% - ${buttonOption.margin}px * 2)`,
            margin: `0 ${buttonOption.margin}px`,
            padding: `0 ${buttonOption.padding}px`,
            borderBottomLeftRadius: `${buttonOption.padding / 2}px`,
            borderBottomRightRadius: `${buttonOption.padding / 2}px`,
            color: buttonOption.colorText,
            backgroundColor: buttonOption.colorBackground,
        };

        return (
            <button className='myFrameButton' style={style} onClick={() => (signal.value = index)}>
                {children}
            </button>
        );
    };

    const modeWrapStyle: JSX.CSSProperties = {
        margin: `0 calc(${option.safe}px + ${option.margin}px + ${option.border}px + ${option.padding}px)`,
        borderTop: `solid ${option.border}px ${buttonOption.colorBackground}`,
    };

    if (style) Object.assign(modeWrapStyle, style);

    const modeStyle: JSX.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        margin: `0 -${option.margin}px`,
    };

    return (
        <div style={modeWrapStyle}>
            <div style={modeStyle}>
                {list.map((item, index) => <Button index={index}>{item}</Button>)}
            </div>
        </div>
    );
}
