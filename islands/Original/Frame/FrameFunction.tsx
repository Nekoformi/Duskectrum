import { JSX } from 'preact/jsx-runtime';

import { frameButtonOption, frameOption } from '@data/frame.ts';
import { Signal } from '@preact/signals';

export type frameFunctionProps = {
    type: {
        setMinimize: boolean;
        minimizeFlag: Signal<boolean>;
        setMaximize: boolean;
        maximizeFlag: Signal<boolean>;
        setHide: boolean;
        hideFlag: Signal<boolean>;
        setFold: boolean;
        foldFlag: Signal<boolean>;
        setClose: boolean;
        closeFlag: Signal<boolean>;
    };
    option: frameOption;
    buttonOption: frameButtonOption;
};

export const FrameFunction = ({ type, option, buttonOption }: frameFunctionProps): JSX.Element => {
    type buttonProps = {
        flag: Signal<boolean>;
        falseSymbol: string;
        trueSymbol: string;
        falseTitle: string;
        trueTitle: string;
    };

    const Button = ({ flag, falseSymbol, trueSymbol, falseTitle, trueTitle }: buttonProps): JSX.Element => {
        const style: JSX.CSSProperties = {
            cursor: 'pointer',
            userSelect: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: `0 ${buttonOption.margin}px`,
            padding: `0 ${buttonOption.padding}px`,
            borderTopLeftRadius: `${buttonOption.padding / 2}px`,
            borderTopRightRadius: `${buttonOption.padding / 2}px`,
            color: buttonOption.colorText,
            backgroundColor: buttonOption.colorBackground,
        };

        return (
            <div className='myFrameButton' title={!flag.value ? falseTitle : trueTitle} style={style} onClick={() => (flag.value = !flag.value)}>
                {!flag.value ? falseSymbol : trueSymbol}
            </div>
        );
    };

    const style: JSX.CSSProperties = {
        display: 'flex',
        margin: `0 -${option.margin}px 0 ${option.margin}px`,
    };

    return (
        <div style={style}>
            {type.setMinimize && <Button flag={type.minimizeFlag} falseSymbol='.' trueSymbol='!' falseTitle='> Minimize Frame' trueTitle='> Restore Frame' />}
            {type.setMaximize && <Button flag={type.maximizeFlag} falseSymbol='+' trueSymbol='@' falseTitle='> Maximize Frame' trueTitle='> Restore Frame' />}
            {type.setHide && <Button flag={type.hideFlag} falseSymbol='#' trueSymbol='=' falseTitle='> Hide Frame' trueTitle='> Show Frame' />}
            {type.setFold && <Button flag={type.foldFlag} falseSymbol='V' trueSymbol='Z' falseTitle='> Fold Frame' trueTitle='> Open Frame' />}
            {type.setClose && <Button flag={type.closeFlag} falseSymbol='X' trueSymbol='O' falseTitle='> Close Frame' trueTitle='> Open Frame' />}
        </div>
    );
};
