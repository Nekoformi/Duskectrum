import { JSX } from 'preact/jsx-runtime';

import { MultiTimeNotation } from '@function/multiTimeNotation.ts';
import TypeSelect from '@islands/Function/CalcBeatsPerMinute/MultiTimeTypeSelect.tsx';
import { Signal, useSignal } from '@preact/signals';

export type timeInputProps = {
    signal: Signal<MultiTimeNotation>;
    inputType: Signal<number>;
};

export const TimeInput = ({ signal, inputType }: timeInputProps): JSX.Element => {
    const updateTimeData = (timeData: string) => {
        signal.value.subTimeData(timeData);

        updateValue();
    };

    const updateTimeCodeFrames = (timeCodeFrames: string) => {
        signal.value.subTimeCodeFrames(timeCodeFrames);

        updateValue();
    };

    const updateTimeCodeSamplings = (timeCodeSamplings: string) => {
        signal.value.subTimeCodeSamplings(timeCodeSamplings);

        updateValue();
    };

    const updateFrames = (frames: string) => {
        signal.value.subFrames(Number(frames));

        updateValue();
    };

    const updateSamplings = (samplings: string) => {
        signal.value.subSamplings(Number(samplings));

        updateValue();
    };

    const updateFrameRate = (frameRate: string) => {
        signal.value.setFrameRate(Number(frameRate));

        updateValue();
    };

    const updateSamplingRate = (samplingRate: string) => {
        signal.value.setSamplingRate(Number(samplingRate));

        updateValue();
    };

    const millisecondSymbol = 'S'.repeat(signal.value.option.millisecondDigit);
    const frameSymbol = 'F'.repeat(signal.value.option.frameRateDigit);
    const samplingSymbol = 'S'.repeat(signal.value.option.samplingRateDigit);

    const timeDataInput = (
        <input
            type='text'
            placeholder={`HH:MM:SS.${millisecondSymbol}`}
            value={signal.value.display.timeData}
            onChange={(e) => updateTimeData(e.currentTarget.value)}
        />
    );

    const timeCodeFramesInput = (
        <input
            type='text'
            placeholder={`HH:MM:SS:${frameSymbol}`}
            value={signal.value.display.timeCodeFrames}
            onChange={(e) => updateTimeCodeFrames(e.currentTarget.value)}
        />
    );

    const timeCodeSamplingsInput = (
        <input
            type='text'
            placeholder={`HH:MM:SS:${samplingSymbol}`}
            value={signal.value.display.timeCodeSamplings}
            onChange={(e) => updateTimeCodeSamplings(e.currentTarget.value)}
        />
    );

    const framesInput = <input type='text' placeholder='Frames' value={signal.value.display.frames} onChange={(e) => updateFrames(e.currentTarget.value)} />;

    const samplingsInput = (
        <input
            type='text'
            placeholder='Samplings'
            value={signal.value.display.samplings}
            onChange={(e) => updateSamplings(e.currentTarget.value)}
        />
    );

    const frameRateInput = (
        <input
            type='number'
            placeholder='FPS'
            value={signal.value.option.frameRate}
            onChange={(e) => updateFrameRate(e.currentTarget.value)}
        />
    );

    const samplingRateInput = (
        <input
            type='number'
            placeholder='SPS'
            value={signal.value.option.samplingRate}
            onChange={(e) => updateSamplingRate(e.currentTarget.value)}
        />
    );

    const updateValue = () => {
        (timeDataInput as unknown as HTMLInputElement).value = signal.value.display.timeData;
        (timeCodeFramesInput as unknown as HTMLInputElement).value = signal.value.display.timeCodeFrames;
        (timeCodeSamplingsInput as unknown as HTMLInputElement).value = signal.value.display.timeCodeSamplings;
        (framesInput as unknown as HTMLInputElement).value = signal.value.display.frames;
        (samplingsInput as unknown as HTMLInputElement).value = signal.value.display.samplings;
        (frameRateInput as unknown as HTMLInputElement).value = String(signal.value.option.frameRate);
        (samplingRateInput as unknown as HTMLInputElement).value = String(signal.value.option.samplingRate);
    };

    return (
        <>
            {inputType.value === 1 && (
                <fieldset>
                    <div>
                        <div class='label'>Time Data (HH:MM:SS.{millisecondSymbol}):</div>
                        {timeDataInput}
                    </div>
                </fieldset>
            )}

            {inputType.value === 2 && (
                <fieldset>
                    <div>
                        <div class='label'>Time Code (HH:MM:SS:{frameSymbol}):</div>
                        {timeCodeFramesInput}
                    </div>
                    <div>
                        <div class='label'>Frame Rate [FPS]:</div>
                        {frameRateInput}
                    </div>
                </fieldset>
            )}

            {inputType.value === 3 && (
                <fieldset>
                    <div>
                        <div class='label'>Time Code (HH:MM:SS:{samplingSymbol}):</div>
                        {timeCodeSamplingsInput}
                    </div>
                    <div>
                        <div class='label'>Sampling Rate [SPS]:</div>
                        {samplingRateInput}
                    </div>
                </fieldset>
            )}

            {inputType.value === 4 && (
                <fieldset>
                    <div>
                        <div class='label'>Frame Index [Frames]:</div>
                        {framesInput}
                    </div>
                    <div>
                        <div class='label'>Frame Rate [FPS]:</div>
                        {frameRateInput}
                    </div>
                </fieldset>
            )}

            {inputType.value === 5 && (
                <fieldset>
                    <div>
                        <div class='label'>Sampling Index [Samplings]:</div>
                        {samplingsInput}
                    </div>
                    <div>
                        <div class='label'>Sampling Rate [SPS]:</div>
                        {samplingRateInput}
                    </div>
                </fieldset>
            )}
        </>
    );
};

export type multiTimeInputProps = {
    id: string;
    signal: Signal<MultiTimeNotation>;
};

export default function MultiTimeInput({ id, signal }: multiTimeInputProps): JSX.Element {
    const inputType = useSignal(1);

    return (
        <>
            <TypeSelect id={id} type={inputType} />
            <TimeInput signal={signal} inputType={inputType} />
        </>
    );
}
